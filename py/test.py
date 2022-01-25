lista = [
    7326,
    7554,
    7788,
    8031,
    8280,
    8537,
    8802,
    9075,
    9357,
    9648,
    9948
]

nova_lista = []

for broj in lista:
    rez = broj * 0.11
    nova_lista.append(round(rez))

print(nova_lista)