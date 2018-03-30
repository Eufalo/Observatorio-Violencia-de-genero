# -*- coding: utf-8 -*-

from bottle import route, run, template, request, response, get, post
import sqlite3
import json
import re
'''
CONSULTAS PUBLICAS API:
    
    /CCAA/<ID_CCAA> ->Muestra las victimas de violencia de genero por ID_CCAA(numero 1-19)
    /Fecha/<dia>/<mes>/<ano> ->Muestra las victimas de violencia de genero por Fecha(dd/mm/aaaa)
    /Fecha/<fech> ->Muestra las victimas de violencia de genero por Fecha(dd-mm-aaaa)
    /Prov/<Provincia> ->Muestra las victimas de violencia de genero por Provincias(numero 1-52)
    /RVA/<RelacionV_A> ->Muestra las victimas de violencia de genero por RelacionV_A(Amante,Amigo,Cliente,Compañero,Conocido,Consuegro,Cuñado,Esposo,Familiar,Hermano,Hijastro,Hijo,Nieto,Padrastro,Padrastro,Pareja,Primo,Tio,Vecino,Yerno)

FORMATOS DEVUELTOS: 
    
    JSON: arraytojson(id_noticias,id_ccaa,fecha,id_provincia,id_municipio,edad,iniciales,agresor,parentesco,url)
    CSV: noticiastocsv(noticias)
'''
class Noticia():
    
    def __init__(self,id_noticias,id_ccaa,fecha,id_provincia,id_municipio,edad,iniciales,agresor,parentesco,url):
        self.id_noticias=id_noticias
        self.id_ccaa=id_ccaa
        self.fecha=fecha
        self.id_provincia=id_provincia
        self.id_municipio=id_municipio
        self.edad=edad
        self.iniciales=iniciales
        self.agresor=agresor
        self.parentesco=parentesco
        self.url=url
@route('/CCAA/<ID_CCAA>/<formato>')
def index(ID_CCAA,formato):#Muestra las victimas de violencia de genero por ID_CCAA
    noticias=[]
    id_noticias = 0
    id_ccaa=0
    fecha=''
    id_provincia=0
    id_municipio=0
    edad=0
    iniciales=''
    agresor=''
    parentesco=''
    url=''
    conexion = sqlite3.connect('DDBB-2.db')
    conector = conexion.cursor()
    conector.execute("SELECT * FROM Localizacion WHERE ID_CCAA = '{CCAA}';".format(CCAA=ID_CCAA))
    result = conector.fetchall()
    for resultado in result:
        id_noticias=str(resultado[0])
        fecha=str(resultado[1])
        id_ccaa=resultado[2]
        id_provincia=resultado[3]
        id_municipio=resultado[4]
        
        conector.execute("SELECT Victima.Edad,Victima.Iniciales,Agresor.Iniciales,Informacion.RelacionV_A,Noticias.URL FROM Victima,Agresor,Informacion,Noticias " 
                         +"WHERE Victima.ID_Noticia  like "+ str(resultado[0])+" and Agresor.ID_Noticia  like "+str(resultado[0])+ " and Informacion.ID_Noticia  like "+str(resultado[0])+" and Noticias.ID_Noticia like "+str(resultado[0]))
        rs = conector.fetchall()
        for res in rs:
             edad=str(res[0])
             iniciales=str(res[1])
             agresor=str(res[2])
             parentesco=str(res[3])
             url=str(res[4])
        noticias.append(Noticia(id_noticias,id_ccaa,fecha,id_provincia,id_municipio,edad,iniciales,agresor,parentesco,url))  
    #js=arraytojson(id_noticias,id_ccaa,fecha,id_provincia,id_municipio,edad,iniciales,agresor,parentesco,url)  
        
    #return js
    if (str(formato) == 'json' ):
            aux=arraytojson(noticias)  
            
    elif (str(formato) == 'csv'):
             
            if (len(noticias)>0):
                aux= noticiastocsv(noticias)
            else:
                aux = "Ningun registro en la fecha introducida"
    else:
        aux ='Error'
   
    return aux
''' 
   
if(len(noticias)>0):
        return noticiastocsv(noticias)
    else: return "Ningun registro en la CCAA introducida"
'''
@route('/Fecha/<dia>/<mes>/<ano>/<formato>')#Muestra las victimas de violencia de genero por Fecha(dd/mm/aaaa)
def index2(dia, mes, ano,formato):
    noticias=[]
    id_noticias = 0
    id_ccaa=0
    fecha=''
    id_provincia=0
    id_municipio=0
    edad=0
    iniciales=''
    agresor=''
    parentesco=''
    url=''
    conexion = sqlite3.connect('DDBB-2.db')
    conector = conexion.cursor()
    conector.execute("SELECT * FROM Localizacion WHERE Fecha LIKE '{dia}/{mes}/{ano}';".format(dia = dia , mes = mes, ano = ano))
    result = conector.fetchall()
    for resultado in result:
        id_noticias=str(resultado[0])
        fecha=str(resultado[1])
        id_ccaa=resultado[2]
        id_provincia=resultado[3]
        id_municipio=resultado[4]
        conector.execute("SELECT Victima.Edad,Victima.Iniciales,Agresor.Iniciales,Informacion.RelacionV_A,Noticias.URL FROM Victima,Agresor,Informacion,Noticias " 
                         +"WHERE Victima.ID_Noticia  like "+ str(resultado[0])+" and Agresor.ID_Noticia  like "+str(resultado[0])+ " and Informacion.ID_Noticia  like "+str(resultado[0])+" and Noticias.ID_Noticia like "+str(resultado[0]))
        rs = conector.fetchall()
        for res in rs:
             edad=str(res[0])
             iniciales=str(res[1])
             agresor=str(res[2])
             parentesco=str(res[3])
             url=str(res[4])
        noticias.append(Noticia(id_noticias,id_ccaa,fecha,id_provincia,id_municipio,edad,iniciales,agresor,parentesco,url))  
        
    if (str(formato) == 'json' ):
            aux=arraytojson(noticias)  
            
    elif (str(formato) == 'csv'):
             
            if (len(noticias)>0):
                aux= noticiastocsv(noticias)
            else:
                aux = "Ningun registro en la fecha introducida"
    else:
        aux ='Error'
   
    return aux
''' 
   
if(len(noticias)>0):
        return noticiastocsv(noticias)
    else: return "Ningun registro en la CCAA introducida"
'''
    

@route('/Fecha/<fech>/<formato>')#Muestra las victimas de violencia de genero por Fecha(dd-mm-aaaa)
def index3(fech,formato):
    noticias=[]
    id_noticias = 0
    id_ccaa=0
    fecha=''
    id_provincia=0
    id_municipio=0
    edad=0
    iniciales=''
    agresor=''
    parentesco=''
    url=''
    conexion = sqlite3.connect('DDBB-2.db')
    conector = conexion.cursor()
    fech=re.split(r'-', fech)
    conector.execute("SELECT * FROM Localizacion WHERE Fecha LIKE '{dia}/{mes}/{ano}';".format(dia = str(fech[0]) , mes = str(fech[1]), ano = str(fech[2])))
    result = conector.fetchall()
    for resultado in result:
        id_noticias=str(resultado[0])
        fecha=str(resultado[1])
        id_ccaa=resultado[2]
        id_provincia=resultado[3]
        id_municipio=resultado[4]
        conector.execute("SELECT Victima.Edad,Victima.Iniciales,Agresor.Iniciales,Informacion.RelacionV_A,Noticias.URL FROM Victima,Agresor,Informacion,Noticias " 
                         +"WHERE Victima.ID_Noticia  like "+ str(resultado[0])+" and Agresor.ID_Noticia  like "+str(resultado[0])+ " and Informacion.ID_Noticia  like "+str(resultado[0])+" and Noticias.ID_Noticia like "+str(resultado[0]))
        rs = conector.fetchall()
        for res in rs:
             edad=str(res[0])
             iniciales=str(res[1])
             agresor=str(res[2])
             parentesco=str(res[3])
             url=str(res[4])
        noticias.append(Noticia(id_noticias,id_ccaa,fecha,id_provincia,id_municipio,edad,iniciales,agresor,parentesco,url))  
        
    if (str(formato) == 'json' ):
            aux=arraytojson(noticias)  
            
    elif (str(formato) == 'csv'):
            if (len(noticias)>0):
                aux= noticiastocsv(noticias)
            else:
                aux = "Ningun registro en la fecha introducida"
    else:
        aux ='Error'
   
    return aux
''' 
   
if(len(noticias)>0):
        return noticiastocsv(noticias)
    else: return "Ningun registro en la CCAA introducida"
'''
@route('/Prov/<Provincia>/<formato>')#Muestra las victimas de violencia de genero por Provincias
def index4(Provincia,formato):
    noticias=[]
    id_noticias = 0
    id_ccaa=0
    fecha=''
    id_provincia=0
    id_municipio=0
    edad=0
    iniciales=''
    agresor=''
    parentesco=''
    url=''
    conexion = sqlite3.connect('DDBB-2.db')
    conector = conexion.cursor()
    conector.execute("SELECT * FROM Localizacion WHERE ID_Provincia = '{Provincia}';".format(Provincia=Provincia))
    result = conector.fetchall()
    for resultado in result:
        id_noticias=str(resultado[0])
        fecha=str(resultado[1])
        id_ccaa=resultado[2]
        id_provincia=resultado[3]
        id_municipio=resultado[4]
        
        conector.execute("SELECT Victima.Edad,Victima.Iniciales,Agresor.Iniciales,Informacion.RelacionV_A,Noticias.URL FROM Victima,Agresor,Informacion,Noticias " 
                         +"WHERE Victima.ID_Noticia  like "+ str(resultado[0])+" and Agresor.ID_Noticia  like "+str(resultado[0])+ " and Informacion.ID_Noticia  like "+str(resultado[0])+" and Noticias.ID_Noticia like "+str(resultado[0]))
        rs = conector.fetchall()
        for res in rs:
             edad=str(res[0])
             iniciales=str(res[1])
             agresor=str(res[2])
             parentesco=str(res[3])
             url=str(res[4])
        noticias.append(Noticia(id_noticias,id_ccaa,fecha,id_provincia,id_municipio,edad,iniciales,agresor,parentesco,url))  
    #js=arraytojson(id_noticias,id_ccaa,fecha,id_provincia,id_municipio,edad,iniciales,agresor,parentesco,url)  
        
    #return js
    if (str(formato) == 'json' ):
            aux=arraytojson(noticias)  
            
    elif (str(formato) == 'csv'):
            if (len(noticias)>0):
                aux= noticiastocsv(noticias)
            else:
                aux = "Ningun registro en la fecha introducida"
    else:
        aux ='Error'
   
    return aux
''' 
   
if(len(noticias)>0):
        return noticiastocsv(noticias)
    else: return "Ningun registro en la CCAA introducida"
'''
@route('/RVA/<RelacionV_A>/<formato>')#Muestra las victimas de violencia de genero por RelacionV_A(Amante,Amigo,Cliente,Compañero,Conocido,Consuegro,Cuñado,Esposo,Familiar,Hermano,Hijastro,Hijo,Nieto,Padrastro,Padrastro,Pareja,Primo,Tio,Vecino,Yerno)
def index5(RelacionV_A,formato):
    noticias=[]
    id_noticias = 0
    id_ccaa=0
    fecha=''
    id_provincia=0
    id_municipio=0
    edad=0
    iniciales=''
    agresor=''
    parentesco=''
    url=''
    conexion = sqlite3.connect('DDBB-2.db')
    conector = conexion.cursor()
    conector.execute("SELECT * FROM Informacion WHERE RelacionV_A = '{RelacionV_A}';".format(RelacionV_A=RelacionV_A))
    result = conector.fetchall()
    for resultado in result:
        id_noticias=str(resultado[0])
        conector.execute("SELECT * FROM Localizacion WHERE ID_Noticia = '{id_not}';".format(id_not=str(resultado[0])))
        rs = conector.fetchall()
        for res in rs:
            fecha=str(res[1])
            id_ccaa=res[2]
            id_provincia=res[3]
            id_municipio=res[4]
        
        conector.execute("SELECT Victima.Edad,Victima.Iniciales,Agresor.Iniciales,Informacion.RelacionV_A,Noticias.URL FROM Victima,Agresor,Informacion,Noticias " 
                         +"WHERE Victima.ID_Noticia  like "+ str(resultado[0])+" and Agresor.ID_Noticia  like "+str(resultado[0])+ " and Informacion.ID_Noticia  like "+str(resultado[0])+" and Noticias.ID_Noticia like "+str(resultado[0]))
        rs = conector.fetchall()
        for res in rs:
             edad=str(res[0])
             iniciales=str(res[1])
             agresor=str(res[2])
             parentesco=str(res[3])
             url=str(res[4])
        noticias.append(Noticia(id_noticias,id_ccaa,fecha,id_provincia,id_municipio,edad,iniciales,agresor,parentesco,url))  
    #js=arraytojson(id_noticias,id_ccaa,fecha,id_provincia,id_municipio,edad,iniciales,agresor,parentesco,url)  
        
    #return js
    if (str(formato) == 'json' ):
            aux=arraytojson(noticias)  
            
    elif (str(formato) == 'csv'):
            if (len(noticias)>0):
                aux= noticiastocsv(noticias)
            else:
                aux = "Ningun registro en la fecha introducida"
    else:
        aux ='Error'
   
    return aux
''' 
   
if(len(noticias)>0):
        return noticiastocsv(noticias)
    else: return "Ningun registro en la CCAA introducida"
'''
def noticiastocsv(noticias):#Devuelve los datos con formato CSV
    csv='Noticia, Fecha, NombreVictima, Edad, ID_CCAA, ID_Prov, ID_Municipios, Agresor, Parentesco, Url'
    for i in noticias:
        aux=str(i.id_noticias)+", "+i.fecha+", "+i.iniciales+", "+str(i.edad)+", "+str(i.id_ccaa)+", "+str(i.id_provincia)+", "+str(i.id_municipio)+", "+str(i.agresor)+", "+str(i.parentesco)+", "+i.url
        csv=csv+"\r\n"+aux
    return csv
def id_provtoNombre(id_prov):#Devuelve el nombre de la provincia 
    conexion = sqlite3.connect('DDBB-2.db')
    conector = conexion.cursor()
    conector.execute("SELECT Nombre FROM Provincias WHERE ID_Prov = '{id_prov}';".format(id_prov=id_prov))
    result = conector.fetchall()
    return str(result[0][0])
def id_MuntoNombre(id_Mun):#Devuelve el nombre de la provincia 
    conexion = sqlite3.connect('DDBB-2.db')
    conector = conexion.cursor()
    conector.execute("SELECT Nombre FROM Municipios WHERE ID_Mun = '{id_Mun}';".format(id_Mun=id_Mun))
    result = conector.fetchall()
    return str(result[0][0])
def arraytojson(noticias):#Devuelve los datos con formato JSON
    id_noticias=[]
    id_ccaa=[]
    fecha=[]
    id_provincia=[]
    id_municipio=[]
    edad=[]
    iniciales=[]
    agresor=[]
    parentesco=[]
    url=[]
    for e in noticias:
        id_noticias.append(e.id_noticias)
        id_ccaa.append(e.id_ccaa)
        fecha.append(e.fecha)
        id_provincia.append(e.id_provincia)
        id_municipio.append(e.id_municipio)
        edad.append(e.edad)
        iniciales.append(e.iniciales)
        agresor.append(e.agresor)
        parentesco.append(e.parentesco)
        url.append(e.url)
    cells={'Fecha':[],'ID_CCAA':[],'ID_Prov':[],'ID_Mun':[],'Edad':[],'NombreVictima':[],'Parentesco':[],'NombreAgresor':[],'URL':[]}
    cells['Fecha']=fecha
    cells['ID_CCAA']=id_ccaa
    cells['ID_Prov']=id_provincia
    cells['ID_Mun']=id_municipio
    cells['Edad']=edad
    cells['NombreVictima']=iniciales
    cells['NombreAgresor']=agresor
    cells['Parentesco']=parentesco
    cells['URL']=url
    return json.dumps(cells)
run(host='localhost', port=8000)
