from typing import OrderedDict
from copy import deepcopy
import pandas as pd
import graphviz

input = '''q0 q1 q2 q3
a b c
q2
q0 b q0
q0 a q1
q1 c q1
q1 a q2
q3 a q1
q3 a q3
q2 a q3'''

def get_nfa(input):
    l = input.split('\n')

    states = l[0].split(' ')
    transitions = l[1].split(' ')
    final = l[2]

    nfa = OrderedDict()

    for state in states:
        nfa[state] = OrderedDict()

        for transition in transitions:
            nfa[state][transition] = []

    for el in l[3:]:
        state, transition, next = el.split(' ')
        nfa[state][transition].append(next)

    return nfa, final


def compute_row(rows):
    result = deepcopy(rows[0])

    for row in rows[1 : ]:
        for key, value in row.items():
            result[key] += value

    for key in result:
        result[key] = list(dict.fromkeys(result[key]))
        result[key].sort()

    return result


def nfa_to_dfa(nfa):
    dfa = OrderedDict()
    states = [ [ 'q0' ] ]

    while len(states) != len(dfa.keys()):
        arr = states[len(dfa.keys())]
        new_state = ''.join(arr)
        new_row = compute_row([nfa[a] for a in arr])
        dfa[new_state] = new_row

        for state in new_row.values():
            if state not in states and state != []:
                states.append(state)

    return dfa


def draw_nfa(nfa, final):
    g = graphviz.Digraph()
    g.attr(rankdir='LR', size='8,5')

    for prev_state, row in nfa.items():
        for transition, next_states in row.items():
            for next_state in next_states:
                g.edge(prev_state, next_state, label=transition)

    g.node(final, penwidth='2.5')

    return g


def draw_dfa(dfa, final):
    g = graphviz.Digraph()
    g.attr(rankdir='LR', size='8,5')

    for prev_state, row in dfa.items():
        for transition, next_state in row.items():
            if next_state != []:
                g.edge(prev_state, ''.join(next_state), label=transition)
        
        if final in prev_state:
            g.node(prev_state, penwidth='2.5')
    
    return g


def create_table(fa):
    data = []
    
    for values in fa.values():
        row = []
        for value in values.values():
            row.append(''.join(value) if len(value) != 0 else '-')

        data.append(row)

    df = pd.DataFrame(data=data, index=fa.keys(), columns=values.keys())
    return df

nfa, final = get_nfa(input)
dfa = nfa_to_dfa(nfa)
# g = draw_nfa(nfa, final)

f = draw_dfa(dfa, final)
table = create_table(dfa)

print(table)

# g.view()
f.view()
