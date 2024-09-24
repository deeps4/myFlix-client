export var MainView = function MainView() {
    var handleClick = function handleClick() {
        console.log("Clicked!!!");
    };
    return React.createElement(
        "div",
        {
            className: "full-height"
        },
        React.createElement("div", null, "Eloquent JavaScript"),
        React.createElement(
            "div",
            null,
            "Mastering JavaScript Functional Programming"
        ),
        React.createElement(
            "div",
            null,
            "JavaScript: The Good Parts"
        ),
        React.createElement(
            "div",
            null,
            "JavaScript: The Definitive Guide"
        ),
        React.createElement(
            "div",
            {
                onClick: handleClick
            },
            "The Road to React"
        )
    );


    const output = {
        type: 'div',
        attr: {},
        childrens: [
            {
                type: 'div',
                attr: {},
                childrens: [
                    {

                    }
                ]
            }
        ]
    }

        < div >
        <div>

        </div>
    </div >
};
