import styled from 'styled-components';

export const Container = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-right: 1px solid #424242;

    main > div {
        /* background-color: #fff; */
        display: flex;
        justify-content: flex-start;
        cursor: pointer;
        transition: all 0.3s linear;
        padding: 10px 10px 0;
    }

    main > div:hover{
        /* background-color: #ccc; */
        padding: 10px 10px 0 20px;
    }

    .imgDiv {
        width: 70px;
        height: 60px;
        display: flex;
        justify-content: center;
        padding: 2px 2px 2px 2px;
        /* background-color:#455; */

        img {
            width: 54px;
            height: 54px;
        }
    }

    .infoContac {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        width: 100%;
        color: #f7ebee;
        border-bottom: 1px solid #424242;

        .info{
            /* background-color: #566; */
            width: 100%;
            display: flex;
        }

        .name {
            display: flex;

            p {
                /* background-color: #899; */
                width: 100%;
                padding: 0px 8px 0px 10px;
                font-size: 18px;
                font-weight: bold;
            }

            /* p:last-child {
                font-weight: 100;
                font-size: 13px;
                display: flex;
                align-items: center;
                padding-top: 5px;
                margin-left: auto;
            } */
        }

        .utimaMsg{

            i {
                padding: 0px 8px 0px 10px;
            }

            i:first-child {
                display: inline-block;
                white-space: nowrap;
                width:250px;
                overflow: hidden !important;
                text-overflow: ellipsis;
            }

            i:last-child {
                margin-left: auto;
            }
        }
    }
`;
