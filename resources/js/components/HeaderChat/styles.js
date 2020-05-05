import styled from 'styled-components';

export const Container = styled.header`
    background-color: #4A494B;
    height: 70px;
    width: 100%;
    padding: 10px 20px;
    display: flex;
    color: #EF2D56;

    .userContact {
        display: flex;
        justify-content: flex-start;
        /* background-color: #678; */

        img {
            width: 50px;
            height: 50px;
        }

        .info{
            /* background-color: #aaa; */
            padding: 2px;
            margin-left: 10px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            color: #f7ebee;

            p {
                font-size: 20px;
                font-weight: bold;
                transition: all 0.3s linear;
            }

            i {
                line-height: 16px;
                transition: all 0.3s linear;
            }
        }
    }

    .iconsFuncs{
        display: flex;
        justify-content: flex-start;
        margin-left: auto;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s linear;
    }

    .dropDown{
        display: none;
        position: absolute;
        background-color: #727273;
        top: 54px;
        margin-left: -117px;
        color: #fff;
        z-index: 2;
        border-radius: 3px;

        ul {
            box-sizing: border-box;
            list-style: none;
            margin: 0;
            padding:0;

            li {
                padding: 5px 10px 5px 10px;
                width: 100%;
                text-align: right;
                transition: background-color linear 0.3s;
                cursor: pointer;

                a {
                    color: #fff;
                }
            }

            li:hover {
                background-color: #868687;
            }
        }
    }

    .iconsFuncs:hover {
        color: #da526f;

        .dropDown{
            display: block;
            animation: fade-in 0.5s;
        }
    }

    .iconsFuncs:not(:hover){
        color: #EF2D56;

        .dropDown.did-fade-in{
            display: block;
            animation: fade-out 0.5s;
        }
    }
`;
