import PropTypes from "prop-types";

export default function MywalletCard ({biddingHistory}){

  
    return(
        <div className="d-flex justify-content-between h5 mt-3 px-5">
        
            <div className="d-flex justify-content-between w-100">
            
            <span>{biddingHistory.refundDate}</span> 
            <span>{biddingHistory.refundAmount}</span>
          </div>
            
        </div>
    )
}

MywalletCard.propTypes = {
    // MyWallCardProps: PropTypes.shape({
    //   // bankAccount: PropTypes.string,
    //   // creditCardNo: PropTypes.string,
    //   // bankBalance: PropTypes.number, // 使用 number 而不是 Double
      biddingHistory: PropTypes.arrayOf( // 定義 biddingHistory 的結構
        PropTypes.shape({
          refundDate: PropTypes.string.isRequired, // 假設 refundDate 是字符串
          refundAmount: PropTypes.number.isRequired, // refundAmount 是數字
        })
      ).isRequired,
    // }).isRequired,
  };