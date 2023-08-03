from flask import Flask, request, jsonify, make_response, send_file
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
import json
import base64
app = Flask(__name__)

def bag_of_word(list_of_words):
    vectorizer = CountVectorizer()
    bag_of_words = vectorizer.fit_transform(list_of_words)
    feature_names = vectorizer.get_feature_names_out()
    word_frequencies = bag_of_words.toarray().sum(axis=0)
    sorted_word_frequencies = dict(zip(feature_names, word_frequencies))
    sorted_word_frequencies = sorted(sorted_word_frequencies.items(), key=lambda x: x[1], reverse=True)[:100]
    result = []
    for word in sorted_word_frequencies:
        item = {"text":word[0],  "value":int(word[1])}
        result.append(item)
    return result

def process_node(node):
    if 'children' in node:
        processed_children = []
        other_value = 0

        for child in node['children']:
            processed_child = process_node(child)
            if processed_child['value'] < 400:
                other_value += processed_child['value']
            else:
                processed_children.append(processed_child)

        if other_value > 0:
            processed_children.append({'name': '', 'value': other_value, 'children': [{'name': '', 'value': other_value, 'fill': "transparent"}], 'fill': "transparent"})

        node['children'] = processed_children

    return node
def nest_pie_data(counts):
    # Create the nested dictionary
    result = {'name': 'root', 'children': []}
    for index, count in counts.items():
        first_word, second_word, third_word, fourth_word, fifth_word = index

        # Find the corresponding branch or create a new one
        first_word_branch = next((child for child in result['children'] if child['name'] == first_word), None)
        if first_word_branch is None:
            first_word_branch = {'name': first_word, 'value': 0, 'children': []}
            result['children'].append(first_word_branch)

        second_word_branch = next((child for child in first_word_branch['children'] if child['name'] == second_word), None)
        if second_word_branch is None:
            second_word_branch = {'name': second_word, 'value': 0, 'children': []}
            first_word_branch['children'].append(second_word_branch)

        third_word_branch = next((child for child in second_word_branch['children'] if child['name'] == third_word), None)
        if third_word_branch is None:
            third_word_branch = {'name': third_word, 'value': 0, 'children': []}
            second_word_branch['children'].append(third_word_branch)

        fourth_word_branch = next((child for child in third_word_branch['children'] if child['name'] == fourth_word), None)
        if fourth_word_branch is None:
            fourth_word_branch = {'name': fourth_word, 'value': 0, 'children': []}
            third_word_branch['children'].append(fourth_word_branch)

        # Add the final leaf node with the count value
        leaf_node = {'name': fifth_word, 'value': count}
        fourth_word_branch['children'].append(leaf_node)

        # Update the value counts along the branches
        first_word_branch['value'] += count
        second_word_branch['value'] += count
        third_word_branch['value'] += count
        fourth_word_branch['value'] += count

    return process_node(result)["children"]

def add_color(result):
    i = 0
    level_1_colors = ["#E91E63", "#03A9F4", "#8BC34A", "#FF5722", "#9C27B0", "#009688", "#FFEB3B", "#9C27B0", "#3F51B5", "#FFCDD2"]
    level_2_colors = ["#EC407A", "#29B6F6", "#9CCC65", "#FF7043", "#AB47BC", "#26A69A", "#FFEE58", "#BA68C8", "#5C6BC0", "EF9A9A"]
    level_3_colors = ["#F06292", "#4FC3F7", "#AED581", "#FF8A65", "#BA68C8", "#4DB6AC", "#FFF176", "#CE93D8", "#7986CB", "#E57373"]
    level_4_colors = ["#F48FB1", "#81D4FA", "#C5E1A5", "#FFAB91", "#CE93D8", "#80CBC4", "#FFF59D", "#CE93D8", "#9FA8DA", "#E57373"]
    level_5_colors = ["#F8BBD0", "#B3E5FC", "#DCEDC8", "#FFCCBC", "#E1BEE7", "#B2DFDB", "#FFF9C4", "#E1BEE7", "#C5CAE9", "#F44336 "]
    #LEVEL 1
    for level1 in range(len(result)):
        if result[level1]["name"] != "":
            result[level1]["fill"] = level_1_colors[i]
        
        #LEVEL 2
        for level2 in range(len(result[level1]["children"])):
            if result[level1]["children"][level2]["name"] != "":
                result[level1]["children"][level2]["fill"] = level_2_colors[i]

            if "children" not in result[level1]["children"][level2]:
                result[level1]["children"][level2]["children"] = [{"name":"", "value": result[level1]["children"][-1]["value"], 'fill': "transparent"}]
            
            #LEVEL 3
            for level3 in range(len(result[level1]["children"][level2]["children"])):
                if result[level1]["children"][level2]["children"][level3]["name"] != "":
                    result[level1]["children"][level2]["children"][level3]["fill"] = level_3_colors[i]

                if  "children" not in result[level1]["children"][level2]["children"][level3]:
                    result[level1]["children"][level2]["children"][level3]["children"] = [{"name":"", "value": result[level1]["children"]
                                                                                           [level2]["children"][-1]["value"],
                                                                                           'fill': "transparent"}]
                
                none_value_4 = 0
                check_empty_4 = 0
                #LEVEL 4
                for level4 in range(len(result[level1]["children"][level2]["children"][level3]["children"])):
                    ##############################################################################################################
                    if result[level1]["children"][level2]["children"][level3]["children"][level4]["name"] == "none":
                        none_value_4 = result[level1]["children"][level2]["children"][level3]["children"][level4]["value"]
                        result[level1]["children"][level2]["children"][level3]["children"][level4]["fill"] = "drop"
                    
                    elif result[level1]["children"][level2]["children"][level3]["children"][level4]["name"] == "":
                        check_empty_4 = 1
                        result[level1]["children"][level2]["children"][level3]["children"][level4]["fill"] = "transparent"
                        
                        if none_value_4 != 0:
                            result[level1]["children"][level2]["children"][level3]["children"][level4]["value"] += none_value_4
                    else:
                        result[level1]["children"][level2]["children"][level3]["children"][level4]["fill"] = level_4_colors[i]
                    ##############################################################################################################
                    
                    
                    
                    if  "children" not in result[level1]["children"][level2]["children"][level3]["children"][level4]:
                        result[level1]["children"][level2]["children"][level3]["children"][level4]["children"] = [{"name":"", "value": result[level1]["children"]
                                                                                           [level2]["children"][level3]["children"][-1]["value"],
                                                                                           'fill': "transparent"}]
                        
                    none_value_5 = 0
                    check_empty_5 = 0
                    for level5 in range(len(result[level1]["children"][level2]["children"][level3]["children"][level4]["children"])):
                        if result[level1]["children"][level2]["children"][level3]["children"][level4]["children"][level5]["name"] == "none":
                            none_value_5 = result[level1]["children"][level2]["children"][level3]["children"][level4]["children"][level5]["value"]
                        
                        elif result[level1]["children"][level2]["children"][level3]["children"][level4]["children"][level5]["name"] == "":
                            check_empty_5 = 1
                            result[level1]["children"][level2]["children"][level3]["children"][level4]["children"][level5]["fill"] = "transparent"
                            if none_value_5 != 0:
                                result[level1]["children"][level2]["children"][level3]["children"][level4]["children"][level5]["value"] += none_value_5
                        else:
                            result[level1]["children"][level2]["children"][level3]["children"][level4]["children"][level5]["fill"] = level_5_colors[i]
                    if none_value_5 != 0:
                        if check_empty_5 == 0:
                            result[level1]["children"][level2]["children"][level3]["children"][level4]["children"].append({"name": "", "value": none_value_5, 'fill': "transparent"})
                        result[level1]["children"][level2]["children"][level3]["children"][level4]["children"] = [child  for child in result[level1]["children"][level2]["children"][level3]["children"][level4]["children"] if child["name"] != "none"]
                if none_value_4 != 0:
                    result[level1]["children"][level2]["children"][level3]["children"] = [child  for child in result[level1]["children"][level2]["children"][level3]["children"] if child["name"] != "none"]
                
        
        i+=1
    return result
def stack_bar_chart(df, column_1, column_2):
    
    total_list1 = df[column_1].value_counts()
    total_list1 = total_list1.reset_index()
    total_list1.columns = ["name", "value"]
    
    total_list = {}
    for i in range(len(total_list1)):
        name, value = total_list1.iloc[i]
        total_list[name] = value
    
    qa_counts = df[[column_1, column_2]].groupby(column_1)[column_2].value_counts().reset_index(name='count')
    qa_result = []
    
    for first_word in qa_counts[column_1].unique():
        temp_dict = {'name': first_word}
        for _, row in qa_counts[qa_counts[column_1] == first_word].iterrows():
            temp_dict[row[column_2]] = row['count']
        qa_result.append(temp_dict)
        
    new_result = []
    answer_uniques = ["other"]
    for qa in qa_result:
        percent = 0
        total = total_list[qa['name']]
        item = {'name': qa['name']}
        keys = list(qa.keys())
        keys.remove('name')
        for answer in keys:
            percent_i = qa[answer]/total*100
            if percent_i > 1 and (percent+percent_i) <= 100:
                answer_uniques.append(answer)
                item[answer] = round(percent_i)
                percent += round(percent_i)
            elif percent_i > 1 and (percent+percent_i) > 100:
                answer_uniques.append(answer)
                percent_i = round(percent_i) - (percent + round(percent_i) - 100)
                item[answer] = percent_i
                percent += percent_i
        if percent < 100:
            item["other"] = 100 - percent
            
        new_result.append(item)
    answer_uniques = set(answer_uniques)
    for i in range(len(new_result)):
        keys = list(new_result[i].keys())
        keys.remove('name')
        for answer in answer_uniques:
            if answer not in keys:
                new_result[i][answer] = 0
        
    return new_result

#######################################################################################################################################

@app.route('/download_data/<dataname>', methods=['GET', "POST"])
def download_data(dataname):
    file_path = dataname
    return send_file(file_path, as_attachment=True)

@app.route('/get_examples/<value_filter>/<number_filter>', methods=['GET', "POST"])
def get_examples(value_filter, number_filter):
    value_filter = value_filter.lower()
    number_filter = int(number_filter)
    data = pd.read_csv("train.csv")
    data = data[["img_path", "question", "topic", "answer", "incorrect",
                  "partially incorrect", "ambiguous", "partially correct", 
                  "correct", "correct & partially correct",
                  "incorrect & partially incorrect",  "judgements","overal_score"]]
    data["judgements"] = data["judgements"].apply(lambda x:  json.loads(x))
    data["all"] = data[["incorrect", "partially incorrect", "ambiguous", "partially correct", "correct"]].max(axis=1)
    data = data[data[value_filter] >= number_filter]
    #data["img_path"] = data["img_path"].apply(lambda x: 'https://storage.googleapis.com/cartoon_img/' + x)
    data = data.sample(n=12)
    data = data.to_dict('records')
    for i in range(len(data)):
        image_data = open("./train_images/" + data[i]["img_path"], "rb").read()
        data[i]["img_path"] = "data:image/jpg;base64," + base64.b64encode(image_data).decode()
    return data

@app.route('/visualize/<value_filter>/<number_filter>/<subtype>', methods=['GET', "POST"])
def visualize(value_filter, number_filter, subtype):
    colors = ["#F06292", "#4FC3F7", "#AED581", "#FF8A65", "#BA68C8", "#4DB6AC", "#FFF176", "#CE93D8", "#7986CB", "#E57373"]
    value_filter = value_filter.lower()
    number_filter = int(number_filter)
    subtype = subtype.lower()
    if subtype == "all":
        train = pd.read_csv("train.csv")
        val = pd.read_csv("val.csv")
        data = pd.concat([train, val])
        data  = data.reset_index(drop=True)
    elif subtype == "train":
        data = pd.read_csv("train.csv")
    else:
        data = pd.read_csv("val.csv")
    data["all"] = data[["incorrect", "partially incorrect", "ambiguous", "partially correct", "correct"]].max(axis=1)
    data = data[data[value_filter] >= number_filter]

    categories = ["incorrect", "partially incorrect", "ambiguous", "partially correct", "correct"]
    colors_dict = {
        "correct & partially correct": "#0E6251",
        "correct": "#28B463",
        "partially correct": "#82E0AA",
        "ambiguous": "#512E5F",
        "partially incorrect": "#F39C12",
        "incorrect": "#E74C3C",
        "incorrect & partially incorrect":"#B03A2E"
    }

    category_counts = data[categories].sum().reset_index()
    category_counts.columns = ["name", "value"]
    category_counts["percent"] = round(category_counts["value"] /category_counts["value"].sum()*100)
    category_counts["fill"] = category_counts["name"].map(colors_dict)

    number_worker_keys = ["Total", "1 Worker", "2 Workers", "3 Workers"]
    cumulative_results = []
    values_list =   list(colors_dict.keys())
    for number_worker in range(3 ,-1, -1):
        item = {}
        for value in values_list:
            item["name"] = number_worker_keys[number_worker]
            count = len(data[data[value]>=number_worker])
            item[value] = int(count)
        cumulative_results.append(item)
        
    topic_count = data["topic"].value_counts()
    topic_count = topic_count.reset_index()
    topic_count.columns = ["name", "value"]
    topic_count["percent"] = round(topic_count["value"]/topic_count["value"].sum()*100, 2)
    topic_count = topic_count.to_dict('records')
    for i in range(len(topic_count)):
        try:
            topic_count[i]["fill"] = colors[i]
        except:
            topic_count[i]["fill"] = "black"
    
    answer_list = data["answer"].value_counts()
    answer_list = answer_list.reset_index()
    answer_list.columns = ["name", "value"]
    answer_list = answer_list[:30] 
    answer_list["percent"] = round(answer_list["value"]/answer_list["value"].sum()*100, 2)
    answer_list = answer_list.to_dict("records")

    nest_data = data.groupby(['first_word', 'secondword', 'thirdword', 'fourword'])['fifword'].value_counts()
    result = nest_pie_data(nest_data)
    result = add_color(result)

    first_word = data["first_word"].value_counts()
    first_word = first_word.reset_index()
    first_word.columns = ["name", "value"]
    first_word["percent"] = round(first_word["value"]/len(data)*100, 2)

    qa_result = stack_bar_chart(data, 'first_word', "answer")
    QAkeys = list(qa_result[0].keys())
    QAkeys.remove("name")

    qt_result = stack_bar_chart(data, 'first_word', "topic")
    QTkeys = list(qt_result[0].keys())
    QTkeys.remove("name")

    answer_type = data["answer_type"].value_counts()
    answer_type = answer_type.reset_index()
    answer_type.columns = ["name", "value"]
    answer_type["percent"] = round(answer_type["value"]/len(data)*100, 2)
    answer_type = answer_type.to_dict("records")
    for i in range(len(answer_type)):
        try:
            answer_type[i]["fill"] = colors[i]
        except:
            answer_type[i]["fill"] = "black"

    len_ques = data["len ques"].value_counts()
    len_ques = len_ques.reset_index()
    len_ques.columns = ["name", "value"]
    for i in range(len(len_ques.max())):
        if i not in list(len_ques["name"]):
            new_row = pd.DataFrame({'name': [i],'value': [0]})
            len_ques = pd.concat([len_ques, new_row], ignore_index=True)
    len_ques["percent"] = round(len_ques["value"]/len_ques["value"].sum()*100, 2)

    len_ques = len_ques.sort_values("name")
    len_ques = len_ques.to_dict("records")
    question_bag = bag_of_word(list(data['question']))
    answer_bag = bag_of_word(list(data['answer']))
    question_answer_bag = bag_of_word(list(data['question']) + list(data['answer']))

    worker_mapping = {
        0: "0 worker",
        1: "1 worker",
        2: "2 workers",
        3: "3 workers"
    }

    category_workers = []
    for category in categories:
        item = data[category].map(worker_mapping).value_counts().to_dict()
        item["name"] = category
        category_workers.append(item)

    summary = {
        "categories":category_counts.to_dict("records"),
        "cumulative_category": cumulative_results,
        "topics": topic_count,
        "answer_list":answer_list,
        "len_ques":len_ques,
        "nest_question":result,
        "first_word":first_word.to_dict("records"),
        "qa_stack":{
            "data": qa_result,
            "keys": QAkeys
        },
        "qt_stack":{
            "data": qt_result,
            "keys": QTkeys
        },
        #"ques_len_list":data["len ques"].tolist(),
        "answer_type": answer_type,
        "question_bag": question_bag,
        "answer_bag": answer_bag,
        "question_answer_bag": question_answer_bag,
        "category_worker": category_workers


    }
    


    return summary

if __name__ == '__main__':
    app.run(debug=True, port=8888)