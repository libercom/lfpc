from asyncio.windows_events import NULL
from collections import OrderedDict
from copy import deepcopy

import graphviz


class NFA:
    nfa = None
    dfa = None
    final = ''

    def __init__(self, input):
        l = input.split('\n')

        states = l[0].split(' ')
        transitions = l[1].split(' ')
        self.final = l[2]

        self.nfa = OrderedDict()

        for state in states:
            self.nfa[state] = OrderedDict()

            for transition in transitions:
                self.nfa[state][transition] = []

        for el in l[3:]:
            state, transition, next = el.split(' ')
            self.nfa[state][transition].append(next)

    @staticmethod
    def compute_row(rows):
        result = deepcopy(rows[0])

        for row in rows[1 : ]:
            for key, value in row.items():
                result[key] += value

        for key in result:
            result[key] = list(dict.fromkeys(result[key]))
            result[key].sort()
        
        return result
    
    def compute_dfa(self):
        self.dfa = OrderedDict()
        states = [ [ 'q0' ] ]

        while len(states) != len(self.dfa.keys()):
            arr = states[len(self.dfa.keys())]
            new_state = ''.join(arr)
            new_row = NFA.compute_row([self.nfa[a] for a in arr])
            self.dfa[new_state] = new_row

            for state in new_row.values():
                if state not in states and state != []:
                    states.append(state)

    def draw_nfa(self):
        g = graphviz.Digraph()
        g.attr(rankdir='LR', size='8,5')

        for prev_state, row in self.nfa.items():
            for transition, next_states in row.items():
                for next_state in next_states:
                    g.edge(prev_state, next_state, label=transition)

        g.node(self.final, penwidth='2.5')

        g.view()

    def draw_dfa(self):
        g = graphviz.Digraph()
        g.attr(rankdir='LR', size='8,5')

        for prev_state, row in self.dfa.items():
            for transition, next_state in row.items():
                if next_state != []:
                    g.edge(prev_state, ''.join(next_state), label=transition)
            
            if self.final in prev_state:
                g.node(prev_state, penwidth='2.5')
        
        g.view()

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

nfa = NFA(input)
nfa.compute_dfa()
nfa.draw_dfa()