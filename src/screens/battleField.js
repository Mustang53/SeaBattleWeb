import {useEffect, useState} from "react";

function BattleField() {
    const CELLSTATUS = {
        initial: 'cellInitial',
        missed: 'cellMissed',
        hurt: 'cellHurt',
        kill: 'cellKill',
    }
    const setInitialBattleFieldMatrix = (reset) => {
        // return []
        let newData = []
        for (let row = 1; row <= 10; row++) {
            for (let col = 1; col <= 10; col++) {
                newData.push({
                    row: row,
                    col: col,
                    status: 'cellInitial'
                })
            }
        }
        if(reset) setBoardData(newData);
        else return newData
        // setBoardData(newData);
    }
    const [boardData, setBoardData] = useState(setInitialBattleFieldMatrix)


    const updateCell = (newCellData) => {
        let updatedCell = {
            row: newCellData.row,
            col: newCellData.col,
            status: CELLSTATUS.kill
        };
        updateBattleFieldMatrix(updatedCell)
    }
    const updateBattleFieldMatrix = (updatedCell) => {
        let newData = []
        // console.log('updateBattleFieldMatrix updatedCell', updatedCell)
        for (let i = 0; i < boardData.length; i++) {
            // console.log('boardData[i].row', boardData[i], updatedCell)
            if (boardData[i].row === updatedCell.row && boardData[i].col === updatedCell.col) {
                console.log('GOT THE CHANGE')
                newData.push(updatedCell);
            } else {
                newData.push(boardData[i]);
            }
        }
        setBoardData(newData);
    }

    const getBattleFieldMatrix = (row, col) => {

        // let matrix = []
        // for(let i = 1 ; i <= 10 ; i++){
        let cell = {
            row: row,
            col: col,
            status: CELLSTATUS.initial
        };
        // matrix[parseInt(`${rowIndex}${i}`)] = cell;
        // matrix.push(cell);
        // }
        return cell;
    }

    const renderBattleCell = (cellData) => {
        console.log('cellData', cellData)
        const cell = <div
            key={`${cellData.row}${cellData.col}`}
            className={`boardCell ${cellData.status}`}
            onClick={() => {
                console.log('clicked on', cellData.row, cellData.col)
                console.log('status', cellData.status)
                updateCell(cellData)
            }
            }
        >
            {`${cellData.row} - ${cellData.col}`}
        </div>;
        return cell;

    }

    const renderBattleField = () => {
        console.log('renderBattleField boardData', boardData)

        if (boardData.length <= 0) return null

        let battleField = []
        let n = 1;
        let battleCells = [];
        for (let i = 0; i < boardData.length; i++) {
            let battleCell;
            // console.log('boardData[i]', boardData[i])

            battleCell = renderBattleCell(boardData[i]);

            battleCells.push(battleCell)

            if (i === ((n * 10) - 1)) {
                battleField.push(<div key={`${i}${n}`} className="boardRow">{battleCells}</div>)
                battleCells = []
                n++;
            }
        }
        // battleField.push(<div className="boardRow">{battleCells}</div>)
        //
        // for (let row = 1; row <= 10; row++) {
        //     let battleCells = [];
        //     let battleCell;
        //     for (let col = 1; col <= 10; col++) {
        //         // const matrixData = getBattleFieldMatrix(row, col);
        //         // console.log('matrixData', matrixData)
        //         // console.log('boardData', boardData)
        //         battleCell = renderBattleCell(boardData[index].row, boardData[index].col, boardData[index].status);
        //         battleCells.push(battleCell)
        //         index++
        //     }
        //     battleField.push(<div className="boardRow">{battleCells}</div>)
        // }

        return battleField
    };


    useEffect(() => {
        console.log('useEffect')
    }, [])

    return (
        <div className="">
            <div className="board">
                {boardData.length && renderBattleField()}
            </div>
            <button onClick={()=>{
                setInitialBattleFieldMatrix(true)
            }}>reset board</button>
        </div>
    );
}

export default BattleField;
