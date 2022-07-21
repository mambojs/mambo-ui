//: Creating a text only button
//@
textOnly('demo-button');

function textOnly(eleName) {
    const config = {
        parentTag: eleName,
        id: 1,
        text: "Single button",
        fnClick: (context) => {
            alert(`${context.button.text()} clicked.`);
        }
    };
    ui.button(config);
}
//!

//: Creating a button with an img element inside
//@
textImage('demo-button');

function textImage(eleName) {
    const config = {
        parentTag: eleName,
        img: {
            attr: {
                src: `data:image/svg+xml;base64,
                PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0
                JveD0iMCAwIDUwIDUwIj48dGl0bGU+aG9tZTwvdGl0bGU
                +PHBvbHlnb24gcG9pbnRzPSI0NyAyMy45OCAyNC41IDEuNDggMiAyMy45OCA4LjA5IDI0IDguMDkgNDguNTIgMTguM
                zYgNDguNTIgMTguMzYgMzUuMTIgMzAuNjQgMzUuMTIgMzAuNjQgNDguNTIgNDAuOTEgNDguNTIgNDAuOTEgMjQgNDc
                gMjMuOTgiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=`,
                alt: "home"
            }
        },
        id: 2,
        text: "Image Button",
        fnClick: (context) => {
            alert(`${context.button.text()} clicked.`);
        }
    };
    
    ui.button(config);
}
//!

//: Creating a button with an <a> element
//@
anchorButtonText('demo-button');

function anchorButtonText(eleName) {
    const config = {
        parentTag: eleName,
        id: 3,
        tag: "a",
        text: "Anchor Button",
        attr: {
            href: location.pathname
        },
        fnClick: (context) => {
            alert(`${context.button.text()} clicked.`);
        }
    };

    ui.button(config);
}
//!

//: Creating a button with an <a> and an <img> element inside
//@
anchorButtonImg('demo-button');

function anchorButtonImg(eleName) {
    const config = {
        parentTag: eleName,
        id: 4,
        tag: "a",
        text: "Anchor Button Image",
        attr: {
            href: location.pathname
        },
        img: {
            attr: {
                src: `data:image/svg+xml;base64,
                PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0
                JveD0iMCAwIDUwIDUwIj48dGl0bGU+aG9tZTwvdGl0bGU
                +PHBvbHlnb24gcG9pbnRzPSI0NyAyMy45OCAyNC41IDEuNDggMiAyMy45OCA4LjA5IDI0IDguMDkgNDguNTIgMTguM
                zYgNDguNTIgMTguMzYgMzUuMTIgMzAuNjQgMzUuMTIgMzAuNjQgNDguNTIgNDAuOTEgNDguNTIgNDAuOTEgMjQgNDc
                gMjMuOTgiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=`,
                alt: "home"
            }
        },
        fnClick: (context) => {
            alert(`${context.button.text()} clicked.`);
        }
    };

    ui.button(config);
}
//!

//: Creating a button that replace the inner image in a hover event.
//@
buttonImgWithHover('demo-button');

function buttonImgWithHover(eleName) {
    const config = {
        parentTag: eleName,
        id: 5,
        text: "Hover Button",
        img: {
            attr: {
                src: `data:image/svg+xml;base64,
                PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0
                JveD0iMCAwIDUwIDUwIj48dGl0bGU+aG9tZTwvdGl0bGU
                +PHBvbHlnb24gcG9pbnRzPSI0NyAyMy45OCAyNC41IDEuNDggMiAyMy45OCA4LjA5IDI0IDguMDkgNDguNTIgMTguM
                zYgNDguNTIgMTguMzYgMzUuMTIgMzAuNjQgMzUuMTIgMzAuNjQgNDguNTIgNDAuOTEgNDguNTIgNDAuOTEgMjQgNDc
                gMjMuOTgiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=`,
                alt: "home"
            },
            hover: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxElEQVRoQ9WZS
            +hVVRTGv1+ZL3Jg9kAqKKU0CHrQwwaWSlEgggi9KBLRQVKzIIheVtAkaBAoBilFTSpqFBFhD5pkFFQWUUEvKAhpYCBZ/
            qsvluwb19u5d+9z7jn/7l2Te+Cuvdb37fXYLzTlQpf4bZ8gaR5wpCs/
            XRNYL2k58NS0EvhU0unA0qkjkNLnT0kR5YVdpVFnKWR7naS30sxvB3Z3EYUuCeyXdGUC/RNw1tQQsB0T81dKnx7u
            +cAfbZPoJAK2V0l6fwDsFuDZaSHwjqQ1A2C/B86deAIpfaL7xCI2KHOBmTZJtJ5Cti
            +S9MkQkDcDL006gdckxQpcJV8DKyadQKTPiSNAzgGiQ7UiraaQ7ZjdLzPINgARpVakbQKR3zdmkB0Aok5akbYJHJV0UgaZ
            JUUa/d0Gg9YI2D5H0neFoNYBsVaMLdi+RNL8vsILUr0i7P8OZ9HbBwu0N+PbJG0oRBTb7IeS7uC6EJHpL/L4jqiF9H
            +H3kwQCFAxG1cXOp8UtWgWF/
            +bQrbvkPTcpKDL4LgfeDx0jqsB20skfSUpfidR4mx9IfBtD1xlEduOXePmCWOwT9L1g91raBeyvVrSu0M2ZbPJLQr4VuDF
            Kqcj26jteZIOSDp/NhH3+TooaQVwaJj/onXA9g5JD88yib3A1pzPIgJhxPZKSdG/5+aMjvl/
            9Pe1wHsldooJJBJzJH0g6dIS4w10fpB0QZ0rmFoEeoBs3yfpWB9uUXYD2
            +vaa0QgRSO6VFGYC0BtBfYW6P1HZRwCD0h6rInTijEvAzc1sTUOgV9aXLFngEbNoREB2wsk/
            dZkxkaMORv4sa7NpgSi2HbVdZbRfxq4s67NpgRips6s6yyjfwRYWNdmbQK2I1dbv+NMwE8DoraKpQmB2yU9X
            +hhT2q1peeMJ4B7C20fU2tC4BtJyzJOIkKXA5+lNePUdM44JTPuMLCoMwK2YyuRu9uM4+m1VbcOtl+QdFsG4OJRu8/
            BsbUiYHuTpFeGAIh9+y25u0/b10h6e8Q5YwfwSGkU6hL4IjZbFcZ/lrQS+LXEse24BYlzxnkV
            +oeAxSV2atVAur2outPcBdxV6rBfz/aDkh6tGLsIOFxiszgCtq
            +T9Gaf0bjEvQr4qMTRMB3b8ejxebxk9uncAzxZYrcOgQ8lXZaMfizpCiBIjC3pUeR1STckYweBM0oMFxEYeLS7G9hZYryu
            ju2Nkl5N7X0B8HvORimBeLR7IxVqFGxnYvtkSdEsohtlzwilBDYDpatpK+RsbwOeyRkrIpAz8n/+/
            w9yPSt2FCZ6UwAAAABJRU5ErkJggg==`
        },
        fnClick: (context) => {
            alert(`${context.button.text()} clicked.`);
        }
    };

    ui.button(config);
}
//!

//: Creating a button that replace the inner image in a hover event.
//@
buttonMultiImgWithHover('demo-button');

function buttonMultiImgWithHover(eleName) {
    const config = {
        parentTag: eleName,
        id: 5,
        text: "Multi Hover Button",
        img: [
            {
                css: { img: "demo-img" },
                attr: {
                    src: `data:image/svg+xml;base64,
                    PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0
                    JveD0iMCAwIDUwIDUwIj48dGl0bGU+aG9tZTwvdGl0bGU
                    +PHBvbHlnb24gcG9pbnRzPSI0NyAyMy45OCAyNC41IDEuNDggMiAyMy45OCA4LjA5IDI0IDguMDkgNDguNTIgMTguM
                    zYgNDguNTIgMTguMzYgMzUuMTIgMzAuNjQgMzUuMTIgMzAuNjQgNDguNTIgNDAuOTEgNDguNTIgNDAuOTEgMjQgNDc
                    gMjMuOTgiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=`,
                    alt: "home"
                },
                hover: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxElEQVRoQ9WZS
                +hVVRTGv1+ZL3Jg9kAqKKU0CHrQwwaWSlEgggi9KBLRQVKzIIheVtAkaBAoBilFTSpqFBFhD5pkFFQWUUEvKAhpYCBZ/
                qsvluwb19u5d+9z7jn/7l2Te+Cuvdb37fXYLzTlQpf4bZ8gaR5wpCs/
                XRNYL2k58NS0EvhU0unA0qkjkNLnT0kR5YVdpVFnKWR7naS30sxvB3Z3EYUuCeyXdGUC/RNw1tQQsB0T81dKnx7u
                +cAfbZPoJAK2V0l6fwDsFuDZaSHwjqQ1A2C/B86deAIpfaL7xCI2KHOBmTZJtJ5Cti
                +S9MkQkDcDL006gdckxQpcJV8DKyadQKTPiSNAzgGiQ7UiraaQ7ZjdLzPINgARpVakbQKR3zdmkB0Aok5akbYJHJV0UgaZ
                JUUa/d0Gg9YI2D5H0neFoNYBsVaMLdi+RNL8vsILUr0i7P8OZ9HbBwu0N+PbJG0oRBTb7IeS7uC6EJHpL/L4jqiF9H
                +H3kwQCFAxG1cXOp8UtWgWF/
                +bQrbvkPTcpKDL4LgfeDx0jqsB20skfSUpfidR4mx9IfBtD1xlEduOXePmCWOwT9L1g91raBeyvVrSu0M2ZbPJLQr4VuDF
                Kqcj26jteZIOSDp/NhH3+TooaQVwaJj/onXA9g5JD88yib3A1pzPIgJhxPZKSdG/5+aMjvl/
                9Pe1wHsldooJJBJzJH0g6dIS4w10fpB0QZ0rmFoEeoBs3yfpWB9uUXYD2
                +vaa0QgRSO6VFGYC0BtBfYW6P1HZRwCD0h6rInTijEvAzc1sTUOgV9aXLFngEbNoREB2wsk/
                dZkxkaMORv4sa7NpgSi2HbVdZbRfxq4s67NpgRips6s6yyjfwRYWNdmbQK2I1dbv+NMwE8DoraKpQmB2yU9X
                +hhT2q1peeMJ4B7C20fU2tC4BtJyzJOIkKXA5+lNePUdM44JTPuMLCoMwK2YyuRu9uM4+m1VbcOtl+QdFsG4OJRu8/
                BsbUiYHuTpFeGAIh9+y25u0/b10h6e8Q5YwfwSGkU6hL4IjZbFcZ/lrQS+LXEse24BYlzxnkV
                +oeAxSV2atVAur2outPcBdxV6rBfz/aDkh6tGLsIOFxiszgCtq
                +T9Gaf0bjEvQr4qMTRMB3b8ejxebxk9uncAzxZYrcOgQ8lXZaMfizpCiBIjC3pUeR1STckYweBM0oMFxEYeLS7G9hZYryu
                ju2Nkl5N7X0B8HvORimBeLR7IxVqFGxnYvtkSdEsohtlzwilBDYDpatpK+RsbwOeyRkrIpAz8n/+/
                w9yPSt2FCZ6UwAAAABJRU5ErkJggg==`
            },
            {
                attr: {
                    src: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxElEQVRoQ9WZS
                    +hVVRTGv1+ZL3Jg9kAqKKU0CHrQwwaWSlEgggi9KBLRQVKzIIheVtAkaBAoBilFTSpqFBFhD5pkFFQWUUEvKAhpYCBZ/
                    qsvluwb19u5d+9z7jn/7l2Te+Cuvdb37fXYLzTlQpf4bZ8gaR5wpCs/
                    XRNYL2k58NS0EvhU0unA0qkjkNLnT0kR5YVdpVFnKWR7naS30sxvB3Z3EYUuCeyXdGUC/RNw1tQQsB0T81dKnx7u
                    +cAfbZPoJAK2V0l6fwDsFuDZaSHwjqQ1A2C/B86deAIpfaL7xCI2KHOBmTZJtJ5Cti
                    +S9MkQkDcDL006gdckxQpcJV8DKyadQKTPiSNAzgGiQ7UiraaQ7ZjdLzPINgARpVakbQKR3zdmkB0Aok5akbYJHJV0UgaZ
                    JUUa/d0Gg9YI2D5H0neFoNYBsVaMLdi+RNL8vsILUr0i7P8OZ9HbBwu0N+PbJG0oRBTb7IeS7uC6EJHpL/L4jqiF9H
                    +H3kwQCFAxG1cXOp8UtWgWF/
                    +bQrbvkPTcpKDL4LgfeDx0jqsB20skfSUpfidR4mx9IfBtD1xlEduOXePmCWOwT9L1g91raBeyvVrSu0M2ZbPJLQr4VuDF
                    Kqcj26jteZIOSDp/NhH3+TooaQVwaJj/onXA9g5JD88yib3A1pzPIgJhxPZKSdG/5+aMjvl/
                    9Pe1wHsldooJJBJzJH0g6dIS4w10fpB0QZ0rmFoEeoBs3yfpWB9uUXYD2
                    +vaa0QgRSO6VFGYC0BtBfYW6P1HZRwCD0h6rInTijEvAzc1sTUOgV9aXLFngEbNoREB2wsk/
                    dZkxkaMORv4sa7NpgSi2HbVdZbRfxq4s67NpgRips6s6yyjfwRYWNdmbQK2I1dbv+NMwE8DoraKpQmB2yU9X
                    +hhT2q1peeMJ4B7C20fU2tC4BtJyzJOIkKXA5+lNePUdM44JTPuMLCoMwK2YyuRu9uM4+m1VbcOtl+QdFsG4OJRu8/
                    BsbUiYHuTpFeGAIh9+y25u0/b10h6e8Q5YwfwSGkU6hL4IjZbFcZ/lrQS+LXEse24BYlzxnkV
                    +oeAxSV2atVAur2outPcBdxV6rBfz/aDkh6tGLsIOFxiszgCtq
                    +T9Gaf0bjEvQr4qMTRMB3b8ejxebxk9uncAzxZYrcOgQ8lXZaMfizpCiBIjC3pUeR1STckYweBM0oMFxEYeLS7G9hZYryu
                    ju2Nkl5N7X0B8HvORimBeLR7IxVqFGxnYvtkSdEsohtlzwilBDYDpatpK+RsbwOeyRkrIpAz8n/+/
                    w9yPSt2FCZ6UwAAAABJRU5ErkJggg==`,
                    alt: "Star"
                },
                hover: `data:image/svg+xml;base64,
                PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0
                JveD0iMCAwIDUwIDUwIj48dGl0bGU+aG9tZTwvdGl0bGU
                +PHBvbHlnb24gcG9pbnRzPSI0NyAyMy45OCAyNC41IDEuNDggMiAyMy45OCA4LjA5IDI0IDguMDkgNDguNTIgMTguM
                zYgNDguNTIgMTguMzYgMzUuMTIgMzAuNjQgMzUuMTIgMzAuNjQgNDguNTIgNDAuOTEgNDguNTIgNDAuOTEgMjQgNDc
                gMjMuOTgiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=`
            }
        ],
        fnClick: (context) => {
            alert(`${context.button.text()} clicked.`);
        }
    };

    ui.button(config);
}
//!