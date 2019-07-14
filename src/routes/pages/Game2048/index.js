import React from 'react'
import Chessboard from "./Chessboard";
import Article from "../component/Article";

export default class Game2048 extends React.PureComponent {
    render ()
    {
        return <Article><Chessboard/></Article>
    }
}