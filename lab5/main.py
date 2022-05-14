import string

def check_F(F,NT):
  for key in F:
    for value in F[key]:
      if value[0] in NT:
        return True

class LL1:
    def __init__(self, file):
        with open(file) as f:
            input = f.read().split('\n')
        
        self.non_terminals = []
        self.terminals = []
        self.start = 'S'
        self.available_symbols = list(string.ascii_uppercase)
        self.new_value = False
        self.grammar = {}

        for line in input:
            self.non_terminals.append(line[0])
            
            for terminal in line[2:]:
                if (terminal.islower()):
                    self.terminals.append(terminal)
            
            if line[0] not in self.grammar:
                self.grammar[line[0]] = []
            
            self.grammar[line[0]].append(line[2:])
        
        self.non_terminals = list(set(self.non_terminals))
        self.terminals = list(set(self.terminals))

        for char in self.non_terminals:
            if char in self.available_symbols:
                self.available_symbols.remove(char)
        
        print(self.terminals)
        print(self.non_terminals)
        print(self.grammar)
    
    def check_left_recursion(self):
        for key in self.grammar:
            for value in self.grammar[key]:
                if value[0] == key:
                    return True, key
        
        return False, ''

    def check_left_factoring(self):
        for key in self.grammar:
            for value in self.grammar[key]:
                if value[-1] == key:
                    return True, key
        
        return False,''

    def print(self):
        print('P={')
        for key in self.grammar:
            print(key,'-> ',end='')
            i=0
            for value in self.grammar[key]:
                if i >= 1:
                    print('|',end='')

                #Replacing _ with ε symbol
                if value == '_':
                    print('ε',end='')
                    i+=1
                else:
                    print(value+'',end='')
                    i+=1

            print()
        print('}')

    def parse(self,word):
        self.step1()
        self.step2()
        self.step3()
        self.step4()
        self.step5()
        self.step6(word)

    def step1(self):
        LR, key = self.check_left_recursion()
        if LR:
            self.left_recursion_elimination(key)
            self.step1()
        else:
            return  

    def left_recursion_elimination(self,key):
        print('Eliminate Left Recursion for',key)
        alpha = []
        beta = []
        letter = self.available_symbols[0]
        self.available_symbols.remove(letter)
        self.non_terminals.append(letter)
        for value in self.grammar[key]:
            if value[0]==key:
                alpha.append(value[1:]+letter)
            elif value=='_':
                beta.append(letter)
            else:
                beta.append(value+letter)
        
        del self.grammar[key]
        self.grammar[key] = beta
        self.grammar[letter] = alpha
        self.grammar[letter].append('_')

    def step2(self):
        LF, key = self.check_left_factoring()
        if LF:
            self.left_factoring_elimination(key)
            self.step2()
        else:
            return
      
    def left_factoring_elimination(self,key):
        print('Eliminate Left Factoring for',key)
        T = []
        T.extend(self.grammar[key])
        min = 100
        for i in range(0,len(T)):
            if len(T[i]) < min:
                min=len(T[i])
            if T[i] == '_':
                T.remove('_')
        if len(T)==1:
            i=0
        else:
            for i in range(0,min):
                l=T[0][i]
                
                for value in T:
                    if (value[i] != l) or (value[i] == key):
                        break
            i+=1
        alpha = []
        beta = []
        letter = self.available_symbols[0]
        self.available_symbols.remove(letter)
        self.non_terminals.append(letter)

        for value in self.grammar[key]:
            if value != '_':
                alpha.append(value[:i]+letter)
                beta.append(value[i:])
            else:
                alpha.append('_')

        if '' in beta:
            beta.remove('')
            beta.append('_')
        
        self.grammar[key] = list(set(alpha))
        self.grammar[letter] = list(set(beta))

    def step3(self):
        self.First={}
        for key in self.non_terminals:
          self.First[key] = []
        for key in self.grammar:
            for value in self.grammar[key]:
                if (value[0] in self.terminals):
                    self.First[key].append(value[0])
                else:
                    self.First[key].append(value)
                    self.First[key]=list(set(self.First[key]))
        
        while (check_F(self.First, self.non_terminals)):
          for key in self.First:
            tab=[]
            for value in self.First[key]:
              if (value[0] in self.non_terminals) and ('_' in self.First[value[0]]) and (len(value)>1):
                tab.extend(self.First[value[0]])
                tab.remove('_')
                tab.append(value[1:])
              elif (value[0] in self.non_terminals):
                tab.extend(self.First[value[0]])
              else:
                tab.append(value)
            tab = list(set(tab))
            self.First[key]=tab
      
    def step4(self):
        self.Follow={}
        for key in self.non_terminals:
          self.Follow[key] = []
        
        self.Follow['S'].append('$')
        for key in self.grammar:
          for value in self.grammar[key]:
            for i in range(0,len(value)):
              if value[i] in self.non_terminals:
                if i == len(value)-1:
                  self.Follow[value[i]].append(key)
                elif value[i+1] in self.terminals:
                  self.Follow[value[i]].append(value[i+1])
                else:
                  print('value',value[i+1], self.grammar[key])
                  tab=self.First[value[i+1]]
                  if '_' in tab:
                    tab.remove('_')
                    tab.append(key)
                  self.Follow[value[i]].extend(tab)
        
        while (check_F(self.Follow,self.non_terminals)):
          for key in self.Follow:
            tab=[]
            for value in self.Follow[key]:
              if (value in self.non_terminals) and (key not in self.Follow[value]):
                tab.extend(self.Follow[value])
              elif value in self.terminals or value == '$':
                tab.append(value)
            tab = list(set(tab))
            self.Follow[key]=tab

    def step5(self):
        self.collumn={}
        i=0
        for key in self.terminals:
          self.collumn[key]=i
          i+=1
        self.collumn['$']=i

        self.rows={}
        for key in self.non_terminals:
          self.rows[key]=[''] * (len(self.terminals)+1)

        for key in self.grammar:
          for value in self.grammar[key]:
            a=[]
            b=[]
            if value[0] in self.terminals:
              a.append(value[0])
            elif value[0] in self.non_terminals:
              a.extend(self.First[value[0]])
              if '_' in a:
                a.remove('_')
                b.extend(self.Follow[key])
            elif value == '_':
              b.extend(self.Follow[key])
            for ter in b:
              self.rows[key][self.collumn[ter]]='_'
            for ter in a:
              self.rows[key][self.collumn[ter]]=value
      
    def step6(self,word):
        Stack='S$'
        Input=word+'$'
        Err=False
        print(' Stack |    Input    | Action ')
        print('------------------------------')
        while(not Err):
          space1=' '*(7-len(Stack))
          space2=' '*(12-len(Input))
          print(Stack+space1+'|',Input+space2+'|',end=' ')
          Err,Stack,Input,Action=self.act(Stack,Input)
          print(Action)

        print()
        if Stack == '$' and Input == Stack:
          print('Success!')
        else:
          print('Error: the word is not correct')


    def act(self,Stack,Input):
        if Stack=='$':
          return True, Stack, Input, 'Done!'
        if Stack[0] == Input[0]:
          return False, Stack[1:], Input[1:], '-'
        new=self.rows[Stack[0]][self.collumn[Input[0]]]
        if new == '_':
          return False, Stack[1:], Input, 'ε'
        elif new != '_':
           return False, new+Stack[1:], Input, new
        else:
          return True,'','',''

a = LL1('grammar2.txt')
a.parse('abgdcf')