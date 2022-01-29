import graphviz as gz
import os

os.environ["PATH"] += os.pathsep + 'C:\\Program Files\\Graphviz\\bin'

file = open('input.txt', 'r')
lines = file.readlines()
file.close()

adjacency_map = {}

for line in lines:
    s = line.strip()

    if len(s) == 4:
        if (s[0], s[3]) in adjacency_map:
            adjacency_map[(s[0], s[3])] = adjacency_map[(s[0], s[3])] + ',' + s[2]
        else:
            adjacency_map[(s[0], s[3])] = s[2]
    else:
        adjacency_map[(s[0], ' ')] = s[2]

g = gz.Digraph()
g.attr(rankdir='LR', size='8,5')

for element in adjacency_map:
    g.attr('node', shape='circle')
    g.node(element[0])

    if element[1] == ' ':
        g.attr('node', shape='doublecircle')
        g.node(element[1])
    else:
        g.attr('node', shape='circle')
        g.node(element[1])

    g.edge(element[0], element[1], label=adjacency_map[element])

g.view()