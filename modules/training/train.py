from os import listdir
from os.path import isfile, join
from train_data import Train

DATA_DIRECTORY = '../../data/'
GENDERED_FOLDERS = listdir(DATA_DIRECTORY)
trained_data = []
combined_data = {}

for gender in GENDERED_FOLDERS:
    TD = Train(gender)
    trained_data.append(TD.start_training())

for td in trained_data:
    for dictionary in td:
        label = dictionary.keys()[0]

        if label not in combined_data:
            combined_data[label] = [insult_data for insult_data in dictionary[label]]
        else:
            combined_data[label] += dictionary[label]


print combined_data
