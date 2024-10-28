package com.artist.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.artist.dto.response.BidrecordDTO;
import com.artist.dto.response.PaintingDTO;
import com.artist.dto.response.TopBiddingsDTO;
import com.artist.dto.response.TopFavoritesDTO;
import com.artist.entity.Paintings;
import com.artist.service.impl.BidrecordServiceImpl;
import com.artist.service.impl.CustomersServiceImpl;
import com.artist.service.impl.PaintingsServiceImpl;
import com.artist.service.impl.WishlistServiceImpl;

@RestController
@RequestMapping("/PTController")
public class PaintingsController {

	@Autowired
	private PaintingsServiceImpl psi;
	@Autowired
	private WishlistServiceImpl wsi;
	@Autowired
	private BidrecordServiceImpl bsi;
	@Autowired
	private CustomersServiceImpl csi;

	@PostMapping(value = "/createPainting", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> createPainting(@RequestParam("image") MultipartFile file,
			@RequestParam("paintingName") String paintingName, @RequestParam("artistId") String artistId,
			@RequestParam("price") Double price, @RequestParam("date") String date, @RequestParam("style") String style,
			@RequestParam("genre") String genre, @RequestParam("status") String status,
			@RequestParam("delicated") Integer delicated) {

		try {
			byte[] imageBytes = file.getBytes();

			PaintingDTO paintingDTO = new PaintingDTO();
			paintingDTO.setPaintingName(paintingName);
			paintingDTO.setArtistId(artistId);
			paintingDTO.setPrice(price);
			paintingDTO.setDate(date);
			paintingDTO.setStyle(style);
			paintingDTO.setGenre(genre);
			paintingDTO.setStatus(status);
			paintingDTO.setDelicated(delicated);
			paintingDTO.setImage(imageBytes);
			psi.create(paintingDTO);

			return ResponseEntity.status(HttpStatus.CREATED).body("新增成功");

		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing image");
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}

	@PutMapping(value = "/editPainting", consumes = "application/json")
	public ResponseEntity<?> updatePaintings(@RequestBody PaintingDTO paintingDTO) {
		psi.update(paintingDTO);
		return ResponseEntity.status(HttpStatus.OK).body("修改成功");
	}

	@DeleteMapping("/{paintingId}")
	public ResponseEntity<Void> deletePaintingById(@PathVariable String paintingId) {
		psi.delete(paintingId);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@GetMapping(value = "/selectall")
	public ResponseEntity<?> findall() {
		List<PaintingDTO> alllist = psi.getAll();
		return ResponseEntity.ok(alllist);
	}

	@GetMapping(value = "/findallavailable")
	public ResponseEntity<?> getDelicatedPaintings() {
		List<PaintingDTO> allAvailable = psi.getAllAvailablePainting();
		return ResponseEntity.ok(allAvailable); 
	}

	@GetMapping(value = "/findpaintingname")
	public ResponseEntity<?> findPaintingsName(@RequestParam("paintingname") String paintingname) {

		List<PaintingDTO> paintingsName = psi.getByPaintingsName(paintingname);
		return ResponseEntity.ok(paintingsName);
	}

	@GetMapping(value = "/findpaintingid/{paintingId}")
	public ResponseEntity<?> getpaintingId(@PathVariable("paintingId") String paintingId) {

		Paintings byPaintingsId = psi.getOnePaintingsById(paintingId);
		return ResponseEntity.ok(byPaintingsId);
	}

	@GetMapping(value = "/findByPage")
	public ResponseEntity<Map<String, Object>> findByPage(
			@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,
			@RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
		Long totalCount = psi.findPaintingsTotalCount();

		int totalPage = (int) Math.ceil((double) totalCount / pageSize);
		int page = currentPage - 1;
		Page<PaintingDTO> paintingsByPage = psi.getPaintingsByPage(pageSize, page);

		Map<String, Object> result = new HashMap<>();
		result.put("totalCount", totalCount);
		result.put("totalPage", totalPage);
		result.put("currentPage", currentPage);
		result.put("pageSize", pageSize);
		result.put("paintingsList", paintingsByPage.getContent());

		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "/findAllInBidding")
	public ResponseEntity<Map<String, Object>> findAllInBidding(
			@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,
			@RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
		Long totalCount = psi.findInBiddingTotalCount();

		int totalPage = (int) Math.ceil((double) totalCount / pageSize);

		int page = currentPage - 1;
		Page<PaintingDTO> paintingsByPage = psi.getAllInBidding(pageSize, page);

		Map<String, Object> result = new HashMap<>();
		result.put("totalCount", totalCount);
		result.put("totalPage", totalPage);
		result.put("currentPage", currentPage);
		result.put("pageSize", pageSize);
		result.put("paintingsList", paintingsByPage.getContent());

		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "/findAllPresaleExhibition")
	public ResponseEntity<Map<String, Object>> findAllPresaleExhibition(
			@RequestParam(value = "currentPage", defaultValue = "0") int currentPage,
			@RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
		Long totalCount = psi.findPresaleExhibitionTotalCount();

		int totalPage = (int) Math.ceil((double) totalCount / pageSize);

		int page = currentPage - 1;
		Page<PaintingDTO> paintingsByPage = psi.getAllInPresaleExhibition(pageSize, page);

		Map<String, Object> result = new HashMap<>();
		result.put("totalCount", totalCount);
		result.put("totalPage", totalPage);
		result.put("currentPage", currentPage);
		result.put("pageSize", pageSize);
		result.put("paintingsList", paintingsByPage.getContent());

		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "/artists")
	public ResponseEntity<Map<String, Object>> findByPage(@RequestParam(value = "artistId") String artistId,
			@RequestParam(value = "currentPage", defaultValue = "1") int currentPage,
			@RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
		Long totalCount = psi.countByDelicatedAndArtistId(artistId);

		int totalPage = (int) Math.ceil((double) totalCount / pageSize);

		int page = currentPage - 1;
		Page<PaintingDTO> paintingsforArtistId = psi.getAllforArtistIdByPage(pageSize, page, artistId);

		Map<String, Object> result = new HashMap<>();
		result.put("totalCount", totalCount);
		result.put("totalPage", totalPage);
		result.put("currentPage", currentPage);
		result.put("pageSize", pageSize);
		result.put("paintingsList", paintingsforArtistId.getContent());

		return ResponseEntity.ok(result);
	}

	// 首頁search
	@GetMapping(value = "/search")
	public ResponseEntity<?> getPaintingsAndArtistPartOfName(@RequestParam() String keyword) {
		List<PaintingDTO> paintingAndArtistPartOfName = psi.findPaintingAndArtistPartOfName(keyword);
		return ResponseEntity.ok(paintingAndArtistPartOfName);
	}

	@GetMapping(value = "/topfavorites")
	public ResponseEntity<Map<String, Object>> getTopFavorites(
			@RequestParam(value = "token", defaultValue = "") String token,
			@RequestParam(value = "pageSize", defaultValue = "3") int pageSize) {
		String customerId = null;
		if (token.equals("")) {
			customerId = null;
		} else {
			customerId = csi.getCustomerIdFromToken(token);
		}
		List<TopFavoritesDTO> topFavorites;
		if (customerId != null) {
			topFavorites = wsi.getTopFavorites(customerId, pageSize);
		} else {
			topFavorites = wsi.getTopFavorites(pageSize);
		}

		List<PaintingDTO> paintingList = new ArrayList<>();
		for (TopFavoritesDTO p : topFavorites) {
			String pId = p.getPaintingId();
			PaintingDTO paintingsId = psi.getByPaintingsId(pId);
			paintingList.add(paintingsId);
		}
		Map<String, Object> response = new HashMap<>();
		response.put("paintingsCount", topFavorites);
		response.put("paintingsList", paintingList);

		return ResponseEntity.ok(response);
	}

	@GetMapping(value = "/topbiddings")
	public ResponseEntity<Map<String, Object>> getTopbiggings(
			@RequestParam(value = "pageSize", defaultValue = "3") int pageSize) {
		List<TopBiddingsDTO> topBiddings = bsi.getTopBidding(pageSize);

		List<PaintingDTO> paintingList = new ArrayList<>();
		for (TopBiddingsDTO p : topBiddings) {
			String pId = p.getPaintingId();
			List<BidrecordDTO> biddingHistory = bsi.getAllBiddingHistoryByPaintings(pId);
			BidrecordDTO bidrecordDTO = biddingHistory.get(0);
			Double price = bidrecordDTO.getBidAmount();
			PaintingDTO paintingsId = psi.getByPaintingsId(pId);
			paintingsId.setPrice(price);
			paintingList.add(paintingsId);
		}
		Map<String, Object> response = new HashMap<>();
		response.put("paintingsCount", topBiddings);
		response.put("paintingsList", paintingList);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/closing-soon")
	public ResponseEntity<List<PaintingDTO>> getUpcomingAuction() {
		List<PaintingDTO> paintings = psi.getUpcomingAuction();
		return ResponseEntity.ok(paintings);
	}

	@GetMapping("/recentuploads")
	public ResponseEntity<List<PaintingDTO>> getRecentUploads() {
		List<PaintingDTO> paintings = psi.getRecentlyUploaded();
		return ResponseEntity.ok(paintings);
	}

	@GetMapping(value = "/image/{paintingId}", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> getImage(@PathVariable String paintingId) {
		byte[] imageData = psi.getPaintingBlob(paintingId);
		if (imageData == null || imageData.length == 0) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageData);
	}

	@PostMapping("/upload")
	public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
		try {
			psi.saveImage(file);
			return ResponseEntity.ok("圖片上傳成功！");
		} catch (IOException e) {
			return ResponseEntity.status(500).body("圖片上傳失敗！");
		}
	}

}
