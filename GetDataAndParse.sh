#!/home/isma/anaconda3/envs/jupyter/bin/python3


"""

    Need to specify which interpret will be running this code. In my case, is the python inside the jupyter env in conda, becouse it has installed pandas and numpy.

"""
import subprocess #Need this library to download the csv via linux commands.
import os
import pandas as pd
import numpy as np

subprocess.run(["curl", "-o","casos_hops_uci_def_sexo_edad_provres.csv", "https://cnecovid.isciii.es/covid19/resources/casos_hosp_uci_def_sexo_edad_provres.csv"])

process = subprocess.Popen(["sshfs", "-o", "password_stdin", "dawbi2104@apps.proven.cat:/home/alumnes/dawbi2104/", "/home/isma/Documentos/pruebas-leaflet/SharedFolder/"], stdin=subprocess.PIPE)
process.stdin.write(b'Ax1jeas7!')
process.stdin.close()


data = pd.read_csv("casos_hops_uci_def_sexo_edad_provres.csv", keep_default_na=False, na_values=['_'])

""" 

At this part i got a couple of troubles:
    1- Theres a NA region in Spain. I was aware of this, and I thought i wouldnt affected me
        becouse the not available numbers in pandas are NaN. Somehow, i noticed after running the code several times
        that there were a region named 0, and the only one that was remaining was Navarra. So i needed to change my 
        not availables values to another character.
    2- After that i saw that there were a region called NC, as the data for thath day, age group or what ever that region
        was pointing, wasnt introduced and we had the data but not which region it was. To avoid this, i filtered by the regions that
        were not 'NC', so im actually losing the region NC data.
        2.1 -> I could fix this adding the NC data to another region but that wouldnt be fair, so i chose to delete that data instead

"""

data = data[data.provincia_iso != "NC"]

data = data[["provincia_iso", "num_casos", "num_hosp", "num_uci", "num_def"]]

data = data.groupby(['provincia_iso']).sum().reset_index()


""" 

The following function is used to a couple of things.
    First of all, i create an empty list for each element inside data['provincia_iso']. That represents a 52 length list.
    50 regions + 2 autonomic cities, Ceuta and Melilla.

    Then i loop the regions. I was thinking in some way to automate this funcionality, but i think, i one way or another,
    this cant be automated 100%. I need to check the regions to assing the autonomic region.

    So, looping the regions, if the current region at the loop is inside an array o defined manually, i assing his autonomic region
    to index that corresponds to that current element inside the list created previously. This way i dont lose the index where it was to be 
    inside the new list. At the end of this function, y return the same dataframe that i had previusly adding the list as a new column.


"""


def f(data):
    
    new_list = [ "" for elem in data['provincia_iso'] ]
    
    for elem in data['provincia_iso']:
        if elem in ['B', 'GI', 'L', 'T'] :
            index = data.index[data['provincia_iso'] == elem].tolist()
            new_list[index[0]] = "CT"
        elif elem in ['AL', 'CA', 'CO', 'GR', 'H', 'J', 'MA', 'SE'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "AN"
        elif elem in ['HU', 'TE', 'Z'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "AR"
        elif elem in ['O'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "AS"
        elif elem in ['GC', 'TF'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "CN"
        elif elem in ['S'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "CB"
        elif elem in ['AB', 'CR', 'CU', 'GU', 'TO'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "CM"
        elif elem in ['AV', 'BU', 'LE', 'P', 'SA', 'SG','SO','VA','ZA'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "CL"
        elif elem in ['BA', 'CC'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "EX"
        elif elem in ['C', 'LU', 'OR', 'PO'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "GA"
        elif elem in ['PM'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "IB"
        elif elem in ['LO'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "RI"
        elif elem in ['M'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "MD"
        elif elem in ['MU'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "MC"
        elif elem in ['NA'] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "NC"
        elif elem in ['VI', "BI", "SS"] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "PV"
        elif elem in ['A', "CS", "V"] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "VC"
        elif elem in ["CE"] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "CE"
        elif elem in ["ML"] :
            index = data.index[data['provincia_iso'] == elem].tolist() 
            new_list[index[0]] = "ML"
        else:
            return None
    return data.insert(len(data.columns), 'CCAA', new_list)

f(data)

"""
After having the info of the Autonomic region, 
i can now groupby that field and transform the data to get the total 
sum of the cases, hospitalizations, uci cases and deaths
"""

data["Suma_casos_CCAA"] = data.groupby(["CCAA"])['num_casos'].transform("sum")
data["Suma_hosp_CCAA"] = data.groupby(["CCAA"])['num_hosp'].transform("sum")
data["Suma_uci_CCAA"] = data.groupby(["CCAA"])['num_uci'].transform("sum")
data["Suma_def_CCAA"] = data.groupby(["CCAA"])['num_def'].transform("sum")


"""

Now i need to read again the main csv (the original one) in orther to add new information.
As i need the progression in time, i need to get that values in a confortable way. This info is in row format.
Meaning that the csv has 495 rows (approx) only becouse of the dates. But this number increases due to the 
age group division (which im not using, but im talking about the original csv). This is repeating for each region.
The csv has 790K (05-13-2021). This is maybe a pretty csv for the human vision, but not for my programming skills.
So i will rotate that data in order to make columns by dates, just to be easiest to access them.


"""


data2 = pd.read_csv("casos_hops_uci_def_sexo_edad_provres.csv", keep_default_na=False, na_values=['_'])

data2 = data2[data2.provincia_iso != "NC"]

data2 = data2.groupby(['provincia_iso', 'fecha']).sum().reset_index()


"""

With this lines im rotating the code. What was X rows due to the dates, are now 1 column with X subcolumns by dates.
This has the following format:

_______________________________________________________
|______________________________num_casos_______________|
|______________     |01-01-2020|   ....   ....   ....  |
|provincia_iso_|    |__________|                       |
|______A_______| ___|____0_____|                       |
|provincia_iso_|    |__________|                       |
|______B_______| ___|____2_____|                       |
|provincia_iso_|    |__________|                       |
|______M_______| ___|____3_____|                       |
|provincia_iso_|    |__________|                       |
|______AB______| ___|____4_____|_______________________|

"""

data_temp = pd.pivot_table(data2, index = ["provincia_iso"], 
                                  values = ["num_casos"], columns = "fecha").fillna(0)
data_temp = data_temp.reset_index()

data_temp2 = pd.pivot_table(data2, index = ["provincia_iso"], 
                                  values = ["num_hosp"], columns = "fecha").fillna(0)
data_temp2 = data_temp2.reset_index()

data_temp3 = pd.pivot_table(data2, index = ["provincia_iso"], 
                                  values = ["num_uci"], columns = "fecha").fillna(0)
data_temp3 = data_temp3.reset_index()

data_temp4 = pd.pivot_table(data2, index = ["provincia_iso"], 
                                  values = ["num_def"], columns = "fecha").fillna(0)
data_temp4 = data_temp4.reset_index()



"""

With this code im getting the values i want in the actual format that i will need in the webpage. Im getting each one of the values to each data and trasnforming it to a list.

For instance:

Values that were:

 01-01-2021   02-01-2021
   
    234          459  

Will be transformed into 

progression = [234,559]

First of all, with data_temp.values im obtaining all the cells values for the rows. So ill get the region following the rest of the cases by day, something like this:

['A', '0','0','1'...] and so on. I need to sabe the first element to know in which region i am. the rest of that are the numbers, so are all the progression cases.

I need to create a list of that, becouse the previous list was a narray of numpy. Once i got that list, i just join them by , meaning im creating a string separated by coma, but a single string
This this becose i was having troubles adding an array to a cell. Dont know if thats possible, but couldnt do it.

Now i only need to add that data (['0,1,2,3,4,5,6']) to the previous dataset. To do dat, need to locate the row of the prov im in, and add to a new column that string created.

"""


for elem in data_temp.values:
    prov = ''.join(elem[:1])
    progresion = elem[1:]
    string_ints = [ str(x) for x in progresion ]
    my_string = ','.join(string_ints)
    data.loc[data['provincia_iso'] == prov, ['progresion_num_casos']] = my_string

for elem in data_temp2.values:
    prov = ''.join(elem[:1])
    progresion = elem[1:]
    string_ints = [ str(x) for x in progresion ]
    my_string = ','.join(string_ints)
    data.loc[data['provincia_iso'] == prov, ['progresion_num_hosp']] = my_string
    
for elem in data_temp3.values:
    prov = ''.join(elem[:1])
    progresion = elem[1:]
    string_ints = [ str(x) for x in progresion ]
    my_string = ','.join(string_ints)
    data.loc[data['provincia_iso'] == prov, ['progresion_num_uci']] = my_string
    
for elem in data_temp4.values:
    prov = ''.join(elem[:1])
    progresion = elem[1:]
    string_ints = [ str(x) for x in progresion ]
    my_string = ','.join(string_ints)
    data.loc[data['provincia_iso'] == prov, ['progresion_num_def']] = my_string

    

data.to_csv("data_final_per_region_and_CCAA_historic.csv", index=False)
