# -*- coding: utf-8 -*-
import re
import requests
import pandas as pd
import os
from bs4 import BeautifulSoup
fecha = []
nombre = []
edad = []
lugar = []
agresor = []
parentesco = []
url=[]
pagina = requests.get ( "http://www.plataformacordobesa.com/computo/?a=2005"  )
sopa = BeautifulSoup(pagina.content, 'html.parser')    
tabla = sopa.find('tbody')
head = list(re.split(r'</tr>',str(tabla)))
#rint(head[0])
    
for i in head:
        aux=list(re.split(r'<td>',i))
        if(len(aux)>6):
            
            fecha.append(aux[1].strip('</td>'))
            aux2=list(re.split(r'target="_blank"><strong>',aux[2]))
            nombre.append(aux2[1].strip('</td>').strip('strong>').strip('</').strip('</strong></a'))
            url.append(aux2[0].strip('<a href=').strip('"'))
            edad.append(aux[3].strip('</td>'))
            lugar.append(aux[4].strip('</td>'))
            agresor.append(aux[5].strip('</td>'))
            parentesco.append(aux[6].strip('</td>'))

print(url[0])
'''
import re
import requests
import pandas as pd
import os
from bs4 import BeautifulSoup


años = [1999, 2000, 2001, 2002, 2003,2004]
años2=[2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]

fecha = []
nombre = []
edad = []
lugar = []
agresor = []
parentesco = []
url=[]

for a in años:
    pagina = requests.get ( "http://www.plataformacordobesa.com/computo/?a=" + str(a) )
    sopa = BeautifulSoup(pagina.content, 'html.parser')    
    tabla = sopa.find('tbody')
    head = list(re.split(r'</tr>',str(tabla)))
    #rint(head[0])
    
    for i in head:
        aux=list(re.split(r'<td>',i))
        if(len(aux)>6):
            
            fecha.append(aux[1].strip('</td>'))
            nombre.append(aux[2].strip('</td>').strip('strong>').strip('</'))
            edad.append(aux[3].strip('</td>'))
            url.append('')
            lugar.append(aux[4].strip('</td>'))
            agresor.append(aux[5].strip('</td>'))
            parentesco.append(aux[6].strip('</td>'))
for a in años2:
    pagina = requests.get ( "http://www.plataformacordobesa.com/computo/?a=" + str(a) )
    sopa = BeautifulSoup(pagina.content, 'html.parser')    
    tabla = sopa.find('tbody')
    head = list(re.split(r'</tr>',str(tabla)))
    #rint(head[0])
    for i in head:
        aux=list(re.split(r'<td>',i))
        if(len(aux)>6):
            
            fecha.append(aux[1].strip('</td>'))
            aux2=list(re.split(r'target="_blank"><strong>',aux[2]))
            if(len(aux2)>1):
                nombre.append(aux2[1].strip('</td>').strip('strong>').strip('</').strip('</strong></a'))
                url.append(aux2[0].strip('<a href=').strip('"'))
            else:
                nombre.append(aux[2].strip('</td>').strip('strong>').strip('</'))
                url.append('')
            edad.append(aux[3].strip('</td>'))
            lugar.append(aux[4].strip('</td>'))
            agresor.append(aux[5].strip('</td>'))
            parentesco.append(aux[6].strip('</td>'))   
#print (fecha)
#print (nombre)
#print (edad)
#print (lugar)
#print (agresor)
#print (parentesco) 
cells={'Fecha':[],'Nombre':[],'Edad':[],'Lugar':[],'Agresor':[],'Parentesco':[],'URL':[]}
cells['Fecha']=fecha
cells['Nombre']=nombre
cells['Edad']=edad
cells['Lugar']=lugar
cells['Agresor']=agresor
cells['Parentesco']=parentesco
cells['URL']=url
df = pd.DataFrame(cells)
writer = pd.ExcelWriter('webscrapingviolencia.xlsx', engine='xlsxwriter')
df.to_excel(writer, sheet_name='Sheet1')



'''