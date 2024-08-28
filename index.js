const MAX_ATTEMPTS = 6;

const READLINE_SYNC = require("readline-sync");

var letters, lettersTyped, lettersNotAvaliable = [
    ' ̶a ', ' ̶b ', ' ̶c ', ' ̶d ',
    ' ̶e ', ' ̶f ', ' ̶g ', ' ̶h ',
    ' ̶i ', ' ̶j ', ' ̶k ', ' ̶l ',
    ' ̶m ', ' ̶n ', ' ̶o ', ' ̶p ',
    ' ̶q ', ' ̶r ', ' ̶s ', ' ̶t ',
    ' ̶u ', ' ̶v ', ' ̶w ', ' ̶x ',
    ' ̶y ', ' ̶z '
];

var answer, underline, hitsToWin, feedback, error;

function newPlay(word_) {
    answer = word_.toUpperCase();
    underline = [];
    feedback = "";
    hitsToWin = 0;
    error = 0;

    letters = [
        ' A ', ' B ', ' C ', ' D ',
        ' E ', ' F ', ' G ', ' H ',
        ' I ', ' J ', ' K ', ' L ',
        ' M ', ' N ', ' O ', ' P ',
        ' Q ', ' R ', ' S ', ' T ',
        ' U ', ' V ', ' W ', ' X ',
        ' Y ', ' Z '
    ];
    lettersTyped = [];

    var len_ = answer.length;
    for(var i = 0; i < len_; i++) {
        if(answer[i] != " ") {
            underline[i] = " __ ";
            hitsToWin ++;
        }else {
            underline[i] =  "    ";
        }
    }
    
    updateBody();
    
}

function play() {
    
    newPlay("pinto");

    while(true) {
        var q = READLINE_SYNC.question("enter a letter: ");
        
        var u = updateAnswer(q);
        if(u == "again") {
            console.log("already typed this letter")
            continue;
        }
        else if(u == "won" || u == "lost") {
            if(end(`you ${u}!`) == "exit") break;
            continue;
        }
    
        updateBody();
    }
}

function end(feedback_) {
    feedback = feedback_;
    updateBody();

    while(true) {
        var todo_ = READLINE_SYNC.question("1- new game\n2- view statistics\n3- exit\n");

        if(todo_ == "1") {
            newPlay("programacao");
            break;
        }
        else if(todo_ == "2") {
            feedback = `error: ${error}, time:`;
            updateBody();
        }
        else if(todo_ == "3") {
            return "exit";
        }
        else {
            continue;
        }
    }
}

var body = [
            [" _______", " |     |", " |      ", " |", " |", " |", "_|_"],
            [" _______", " |     |", " |     O", " |", " |", " |", "_|_"], 
            [" _______", " |     |", " |     O", " |     |", " |", " |", "_|_"],
            [" _______", " |     |", " |     O", " |    /|", " |", " |", "_|_"],
            [" _______", " |     |", " |     O", " |    /|\\", " |", " |", "_|_"],
            [" _______", " |     |", " |     O", " |    /|\\", " |    /", " |", "_|_"],
            [" _______", " |     |", " |     O", " |    /|\\", " |    / \\", " |", "_|_"]
            ];

var bodyLen = body[0][0].length-1;

function updateBody() {
    var underline_;
    var feedback_;
    for(var i = 0; i < bodyLen; i++) {
        underline_ = i == 3 ? "            " + underline.join("") : "";
        feedback_ = i == 5 ? "            " + feedback : "";
        console.log(body[error][i] + underline_ + feedback_);
    }
    console.log("\n| " + letters.join("") + " |");
}

function updateAnswer(letterAsnwer_) {
    var letter_ = letterAsnwer_[0].toUpperCase();
    var hits_ = 0;

    for(var i = 0; i < lettersTyped.length; i++) {
        if(letter_ == lettersTyped[i]) return "again";
    }
    // -> nao digitei essa letra
    
    lettersTyped[lettersTyped.length] = letter_;
    // -> marca a letra como digitada

    for(var i = 0; i < answer.length; i++) {
        if(letter_ == answer[i] && underline[i] == " __ ") {
            underline[i] = " " + letter_ + " ";
            hits_++;
            hitsToWin --;
        }
    }
    // -> se a letra corresponde a resposta, ela é adicionada na underline e é contado o acerto
    
    for(var i = 0; i < letters.length; i++) {
        if(" " + letter_ + " " == letters[i]) {
            letters[i] = lettersNotAvaliable[i];
        }
    }
    // -> o alfabeto é atualizado

    if(hits_ == 0) {
        error ++;
        if(error >= MAX_ATTEMPTS) {
            return "lost"
        }
        return false;
    }else {
        if(hitsToWin == 0) {
            return "won";
        
        }
        return true;
    }
}

play();
