var questions = [];
var answers = [];
// Reading from file
var result_string;
var start = 0;
var numb = 0;
const fileInput = document.getElementById("topic");
fileInput.addEventListener('change', () => {
    const fr = new FileReader();
    fr.readAsText(fileInput.files[0]);

    fr.addEventListener('load', () => {
        result_string = fr.result;
        var arr = Array.from(result_string);
        console.log(arr);
        console.log("Length: " + arr.length);
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] == ';')
            {
                var txt = result_string.slice(start, i);
                start = i;
                numb++;
            }

            if(arr[i] == '\r')
            {
                var ans = result_string.slice(start + 1, i);
                start = i;
                numb++;
            }

            if(numb == 2)
            {
                questions.push({text: txt, right_answer: ans});
                numb = 0;
            }
        }
        console.log(questions);
        document.getElementById("quest_text").innerHTML = questions[0].text;
        right_ans = questions[0].right_answer;
        var number = '';
        document.getElementById("errors").innerHTML = number;
    })
});
//

var i = 2;
var quest_numb = 0;
var col_clicks = 0;
var result = 0;
var right_ans;
document.getElementById("next").disabled = true;

function Next()
{
    if(quest_numb < questions.length-1)
    {
        quest_numb++;
        document.getElementById("quest_text").innerHTML = questions[quest_numb].text;
        right_ans = questions[quest_numb].right_answer;
        col_clicks = 0;
        document.getElementById("next").disabled = true;
        document.getElementById("ans_sost").innerHTML = '';
        document.getElementById("inp").value = '';
    }
    else{
        var percent = result/questions.length * 100;
        document.getElementById("quest_text").innerHTML = "Ваш результат " + percent + "%";
        document.getElementById("inp").value = '';
        document.getElementById("inp").style.border = "none";
        document.getElementById("ans_sost").innerHTML = '';

        document.getElementById("bar_border").style.border = "solid 3px";
        document.getElementById("bar").style.width = ((result/questions.length * 600) + "px");
        document.getElementById("bar").style.backgroundColor = "#4848ff";

        //
        const Newspan1 = document.createElement("span");
        const Newcontent1 = document.createTextNode('Номер');
        Newspan1.appendChild(Newcontent1);
        const Currentspan1 = document.getElementById("errors");
        const element1 = document.getElementById("numb");
        element1.insertBefore(Newspan1, Currentspan1);
        //
        const Newspan2 = document.createElement("span");
        const Newcontent2 = document.createTextNode('Правильность');
        Newspan2.appendChild(Newcontent2);
        const Currentspan2 = document.getElementById("text_sost");
        const element2 = document.getElementById("sost");
        element2.insertBefore(Newspan2, Currentspan2);
        //
        const Newspan3 = document.createElement("span");
        const Newcontent3 = document.createTextNode('Ваш ответ');
        Newspan3.appendChild(Newcontent3);
        const Currentspan3 = document.getElementById("your");
        const element3 = document.getElementById("your_ans");
        element3.insertBefore(Newspan3, Currentspan3);
        //
        const Newspan4 = document.createElement("span");
        const Newcontent4 = document.createTextNode('Верный ответ');
        Newspan4.appendChild(Newcontent4);
        const Currentspan4 = document.getElementById("right");
        const element4 = document.getElementById("right_ans");
        element4.insertBefore(Newspan4, Currentspan4);
        //

        //add element
        for(var i = 1; i <= questions.length; i++)
        {
            var sost_ans = '';
            if(answers[i-1] == questions[i-1].right_answer)
                sost_ans = 'Верно';
            else
                sost_ans = 'Неверно';
            const Newspan1 = document.createElement("span");
            const Newcontent1 = document.createTextNode(i);
            Newspan1.appendChild(Newcontent1);
            const Currentspan1 = document.getElementById("errors");
            const element1 = document.getElementById("numb");
            element1.insertBefore(Newspan1, Currentspan1);
            //
            const Newspan2 = document.createElement("span");
            const Newcontent2 = document.createTextNode(sost_ans);
            Newspan2.appendChild(Newcontent2);
            const Currentspan2 = document.getElementById("text_sost");
            const element2 = document.getElementById("sost");
            element2.insertBefore(Newspan2, Currentspan2);
            //
            const Newspan3 = document.createElement("span");
            const Newcontent3 = document.createTextNode(answers[i-1]);
            Newspan3.appendChild(Newcontent3);
            const Currentspan3 = document.getElementById("your");
            const element3 = document.getElementById("your_ans");
            element3.insertBefore(Newspan3, Currentspan3);
            //
            const Newspan4 = document.createElement("span");
            const Newcontent4 = document.createTextNode(questions[i-1].right_answer);
            Newspan4.appendChild(Newcontent4);
            const Currentspan4 = document.getElementById("right");
            const element4 = document.getElementById("right_ans");
            element4.insertBefore(Newspan4, Currentspan4);
            //
            Newspan1.style.color = "#626262";
            Newspan2.style.color = "#626262";
            Newspan3.style.color = "#626262";
            Newspan4.style.color = "#626262";
            //
            document.getElementById("next").disabled = true;
            document.getElementById("next").style.visibility = "hidden";
            document.getElementById("main").style.height = "250px";
            //
            if(answers[i-1] == questions[i-1].right_answer)
            {
                Newspan2.style.backgroundColor = "#8ed29a";
                Newspan3.style.backgroundColor = "#8ed29a";
            }
            else
            {
                Newspan2.style.backgroundColor = "#dea4a4";
                Newspan3.style.backgroundColor = "#dea4a4";
            }
        }
    }
}

function Check()
{
    var check = 0;
    if(document.getElementById("inp").value != '')
    {
        if(document.getElementById("inp").value == right_ans && col_clicks == 0)
        {
            document.getElementById("ans_sost").innerHTML = "Верно!!!";
            col_clicks++;
            document.getElementById("next").disabled = false;
            result++;

            answers.push(document.getElementById("inp").value);
            console.log(answers);
        }
        else if(document.getElementById("inp").value != right_ans && col_clicks == 0)
        {
            document.getElementById("ans_sost").innerHTML = "Неверно:(";
            col_clicks++;
            document.getElementById("next").disabled = false;
            answers.push(document.getElementById("inp").value);
            console.log(answers);
        }
        if(quest_numb == questions.length - 1)
        {
            document.getElementById("next").innerHTML = "Узнать результат";
            document.getElementById("check").disabled = true;
            document.getElementById("check").style.backgroundColor = "transparent";
            document.getElementById("check").style.border = "none";
            document.getElementById("buttons1").style.marginLeft = "22%";
            check++;
            document.getElementById("answers").style.visibility = "visible";
        }
    }
    else
        alert("Введите ответ!");

}

document.getElementById("next").addEventListener("click", Next);
document.getElementById("check").addEventListener("click", Check);