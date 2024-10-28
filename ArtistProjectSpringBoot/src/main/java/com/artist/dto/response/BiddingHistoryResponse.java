package com.artist.dto.response;

import java.util.List;

public class BiddingHistoryResponse {
	
	    private PaintingDTO painting;
		 private List<BidrecordDTO> biddingHistory;

	    
	    public BiddingHistoryResponse() {
			super();
		}


		public BiddingHistoryResponse( PaintingDTO painting,List<BidrecordDTO> biddingHistory) {
	        this.biddingHistory = biddingHistory;
	        this.painting = painting;
	    }


		public List<BidrecordDTO> getBiddingHistory() {
			return biddingHistory;
		}


		public void setBiddingHistory(List<BidrecordDTO> biddingHistory) {
			this.biddingHistory = biddingHistory;
		}


		public PaintingDTO getPainting() {
			return painting;
		}


		public void setPainting(PaintingDTO painting) {
			this.painting = painting;
		}
	    
	    
}
