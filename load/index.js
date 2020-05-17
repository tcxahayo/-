import React, { Component } from 'react';
import './index.css';
class Loading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stroke: 0
    }
  }
  componentDidMount(){
    this.mapScore(this.props.score);
  }
  componentWillReceiveProps(nextProps){
    this.mapScore(nextProps.score);
  }

  mapScore(score = 0) {
    var circleLength = Math.floor(2 * Math.PI * (50*0.45));//圆的周长
    this.setState({
      stroke: circleLength / 100 * score,
    })
  }

  render() { 
    const score = this.props.score || 0;
    return ( 
      <div className='load-content'>
         <svg class="svg" xmlns="http://www.w3.org/2000/svg" height="50" width="50">
            {/* <!-- 外圈圆圈，cx，cy垂直居中，r为父元素的45%，fill是内部填充，stroke是外边框颜色，stroke-width的外边框宽度，stroke-linecap是外边框的圆角或者其他形状 --> */}
            <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#F0F2F5" strokeWidth="5" strokeLinecap="round"/>
            {/* <!-- 内圈圆圈 --> */}
            <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#5FA6FF" strokeWidth="5" strokeDasharray={`${this.state.stroke}, 10000`} strokeLinecap="round" id="circle"/>
        </svg>
        <span class="text" id="text">{score}%</span>
      </div>
     );
  }
}
 
export default Loading;