const textElement = document.getElementById("storytext")
const optionButtonsElement = document.getElementById("optionsbuttons")

 


    

      

let state = {}

function StartGame() {
    state = {}
    ShowTextNode(1)
    SetTitleArt()
}

function SetTitleArt () {


    fetch('/titleart.txt') // Replace '/foo.txt' with your actual file path
        .then(response => response.text())
        .then(data => { var fileContents = data;console.log(fileContents); // Display the file contents
     });
    
    document.getElementById(filecontents).innerText = titleartdoc
}

function ShowTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => SelectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function SelectOption(option){
    const nexttextnodeid = option.nextText
    if (nexttextnodeid <= 0) {
        return StartGame
    }
    state = Object.assign(state, option.setState)
    ShowTextNode(nexttextnodeid)
}

const textNodes = [
    {
        id: 1,
        text: "Welcome to your crooked experience.\n\n You woke up feeling lucky today and deicided to play the Causway lotto. You can feel the imminent victory ahead of you. All you have to do is fill out a ticket at the local Hardware store. Your adventure awaits you.\n\n______________________________________\nFirst, please select you class:",
        options: [
            {
                text: "DIY Customer\nYou have a job to do. You don't really know what it is or how to do it. But at least you're determined.\n\xa0\xa0\xbb You get +5 to your art of bullshitting \xab\n\xa0\xa0\xbb You get -5 to your professional expertise \xab\n\xa0\xa0\xbb You pay with cash\xab",
                setState: {tookoption1: true},
                nextText: 2
            },
            {
                text: "option 2 for index one page",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "this is index 2 text",
        options: [
            {
                text: "buy sword if took opt 1",
                requiredState: (currentState) =>currentState.tookoption1,
                setstate: { tookoption1: false, sword:true },
                nextText: 3
            },
            {
                text: "buy shield if took opt 1",
                nextText: 3
            },
            {
                text: "didnt take option 1 lol looser",
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "this is index 3 text",
        options: [
            {
                text: "die and restart",
                nextText: -1
            },
        ]
    }
]

StartGame()