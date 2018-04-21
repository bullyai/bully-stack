
from os import listdir
from os.path import isfile, join
import uuid

class TrainedData:
    def __init__(self, gender):
        self.gender = gender
        self.trained_data = []

    def get_all_files(self, directory):
        all_files = [f for f in listdir(self.gender) if isfile(join(self.gender, f))]
        return all_files

    def read_file(self, directory):
        file_object = open(directory, "r")
        data = file_object.read()

        lines = self.process_file_data_into_lines(data)

        file_object.close()

        return lines

    def process_file_data_into_lines(self, data):
        return [line.strip('"') for line in data.split('\n')]

    def create_label(self, file_name):
        file_name_split = file_name.split('.')

        if (len(file_name_split) > 2):
            raise "File name must have only one extension type"

        return file_name_split[0]

    def classify_insults(self, label, insults):
        return [{
            "id": uuid.uuid4().hex,
            "gender": self.gender,
            "insult": insult
        } for insult in insults if len(insult) > 0]

    def start_training(self):
        all_file_names = self.get_all_files(self.gender)

        for files in all_file_names:
            label = self.create_label(files)

            file_directory = join(self.gender, files)

            insults = self.read_file(file_directory)

            classfified_insults = self.classify_insults(label, insults)

            self.trained_data.append(classfified_insults)

        return self.trained_data
