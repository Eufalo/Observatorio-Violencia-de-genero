# -*- coding: utf-8 -*-

import re
import requests
from bs4 import BeautifulSoup
import sqlite3
class Noticia():
    
    def __init__(self,titular, descripcion,url):
        self.titular=titular
        self.descripcion=descripcion
        self.url=url
def noticias_url(url):    
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    Titular= soup.find('h1', class_='articulo-titulo')
    TextoCampo=''
    #print(Titular.get_text()+"##")

    c= 0
    Campos= soup.find_all('p', class_='Cuerpo')
    for campo in Campos:
        TextoCampo = Campos[c].get_text()
        #print(TextoCampo)
        c=c+1
    noti=Noticia(Titular.get_text(),TextoCampo,url)
    return Titular.get_text(),TextoCampo,url
def url(url):
    url_not=[]
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    urls= soup.find_all('h2', itemprop="headline")
    for i in urls:
        #print(type(str(i)))
        i=re.split(r'href="', str(i))
        i=re.split(r'"', i[1])
        url_not.append(i[0])
    return url_not  
  
url_not=url('https://elpais.com/tag/violencia_genero/a')
noticias=[]
#con.commit()
con=sqlite3.connect('./DDBB-4.db',isolation_level=None)
for i in url_not:
    ur='https:'+i
    noticias.append(noticias_url('https:'+i))
    ins='INSERT INTO Noticias (URL) VALUES ( " https://elpais.com/tag/violencia_genero/a " )'
    q = con.execute(ins)
    
con.close()

