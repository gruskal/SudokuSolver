import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import SudokuWorker from "./worker";
import Snackbar from "@material-ui/core/Snackbar";

import {
  SidebarAction,
  SudokuPlayer,
  SudokuBoard
} from "./components/";
import {
  Header,
  Content,
  Sidebar
} from "./components/layout";

/* Constants */
const INITIALBOARD = [
  8, 0, 0, 9, 3, 0, 0, 0, 2,
  0, 0, 9, 0, 0, 0, 0, 4, 0,
  7, 0, 2, 1, 0, 0, 9, 6, 0,
  2, 0, 0, 0, 0, 0, 0, 9, 0,
  0, 6, 0, 0, 0, 0, 0, 7, 0,
  0, 7, 0, 0, 0, 6, 0, 0, 5,
  0, 2, 7, 0, 0, 8, 4, 0, 6,
  0, 3, 0, 0, 0, 0, 5, 0, 0,
  5, 0, 0, 0, 6, 2, 0, 0, 8
];

/* Styles */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex: 1 1 100%;
  height: 100%;
  background-color: #ecf0f1;
`;

const HeaderText = styled.div`
  font-size: 2em;
  font-family: monospace;
`;

const Modal = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #F2F4F3;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex: 1 1 100%;
  height: 100%;
  flex-direction: row;
  align-content: center;
  flex-wrap: nowrap;
  justify-content: center;
`;

const StatusBar = styled.div`
  background-color: #35374D;
  color: white;
  border-radius: 5px;
  padding: 12px;
  font-size: ${({compact}) => compact ? "3em" : "1.2em"};
  text-align: center;
`;

/* Components */
const App = () => {
  const sudokuPlayer = new SudokuPlayer();
  sudokuPlayer.initializeBoard(INITIALBOARD);

  return (
    <Main sudokuPlayer={sudokuPlayer}/>
  );
}

class Main extends React.Component {
  constructor(props) {
    super(props);

    const {
      sudokuPlayer,
    } = this.props;

    this.boardRef = null;
    this.worker = new SudokuWorker();
    this.worker.addEventListener('message', this.handleWorkerMessage, false);
    window.addEventListener('resize', () => {
      this.forceUpdate();
    });
    
    this.state = {
      compactMenuOpen: false,
      editMode: false,
      currentBoard: INITIALBOARD,
      sodokuRunner: null,
      status: "",
      cells: sudokuPlayer.getCells(),
      stepping: false,
      snackbarOpen: false,
      snackbarAutoHide: true
    }
  }
  
  handleWorkerMessage = (event) => {
      const {
        data: {
            command,
            status,
            cells
        }
      } = event;

      if(command === "QuickSolve") {
        console.log("Cell Values: ", cells.map((cell) => cell.value));
        this.setState({
          cells: cells
        });
        this.showStatus(status);
      }
  }

  handleEdit = () => {
    this.setState({
      editMode: true,
      compactMenuOpen: false
    });
    this.boardRef.focus();
    this.showStatus("Tip: You can use arrow keys or tabbing to navigate the grid");
  }

  handleFinish = () => {
    this.setState({
      editMode: false
    });
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false
    })
  }

  handleCancel = () => {
    this.worker.terminate();
    this.worker = new SudokuWorker();
    this.showStatus("Canceled");
  }

  handleBack = () => {
    this.setState({
      compactMenuOpen: false
    });
  }

  showStatus = (status, autoHide = true) => {
    this.setState({
      status: status,
      snackbarOpen: true,
      snackbarAutoHide: autoHide
    })
  }

  openCompactMenu = () => {
    this.setState({
      compactMenuOpen: true
    });
  }

  readCells = () => {
    let index = 0;
		const newCells = new Array(81);
		let currentCell = document.getElementById(`c${index}`);
		while(currentCell) {
			const cellValue = document.getElementById(`c${index}`).value;
			newCells[index] = cellValue === "" ? 0 : parseInt(cellValue);
			try {
				index++;
				currentCell = document.getElementById(`c${index}`);
			} catch(error) {
				currentCell = null;
			}
		}
    return newCells;
  }

	quickSolveSodoku = () => {
    this.worker.postMessage({
      command: "QuickSolve",
      cells: this.readCells(),
    });
    this.showStatus("Working . . .", false);
    this.setState({
      compactMenuOpen: false
    });
  }
  
  render = () => {
    const {
      editMode,
      cells,
      compactMenuOpen,
      status,
      snackbarOpen,
      snackbarAutoHide
    } = this.state;

    const isCompact = window.outerWidth  < 600; // If mobile
    const menuContent = (
      <React.Fragment>
        {editMode ?
           <React.Fragment>
            <SidebarAction text="Finish" compact={isCompact} onClick={this.handleFinish}/>
          </React.Fragment>
          :
            status === "Working . . ." ? 
            <SidebarAction text="Cancel" compact={isCompact} onClick={this.handleCancel}/> 
              :
                <React.Fragment>
                  <SidebarAction text="Edit" compact={isCompact} onClick={this.handleEdit}/>
                  <SidebarAction text="Quick Solve" compact={isCompact} onClick={this.quickSolveSodoku}/>
                </React.Fragment>
        }
      </React.Fragment>
    );
    return (
      <Container>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={snackbarOpen}
            autoHideDuration={snackbarAutoHide ? 4000 : undefined}
            ClickAwayListenerProps={{ onClickAway: () => null }}
            onClose={this.handleSnackbarClose}
          >
            <StatusBar compact={isCompact}> {status} </StatusBar>
          </Snackbar>
        {compactMenuOpen &&
          ReactDOM.createPortal(
            <Modal>
              <SidebarAction text="Back" compact={isCompact} onClick={this.handleBack}/>
              {menuContent}
            </Modal>,
            document.getElementById('root'),
          )
        }
        <Header compact={isCompact} menuContent={menuContent} onCompactMenuOpen={this.openCompactMenu}>
          <HeaderText> Sudoku Solver </HeaderText>
        </Header>
        <Content>
          {!isCompact &&
            <Sidebar>
            {menuContent}
            </Sidebar>
          }
          <FlexWrapper>
            <SudokuBoard 
              cells={cells}
              editMode={editMode}
              ref={(instance) => this.boardRef = instance}
              compact={isCompact}
            />
			    </FlexWrapper>
        </Content>
      </Container>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
