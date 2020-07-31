import React from 'react';

// Board.js内、<Square />で定義されている値を受け取る。
const Square = (props) => {
	return (
		// ボタン押された際、Square.onClickを呼び出す
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
};

export default Square;

