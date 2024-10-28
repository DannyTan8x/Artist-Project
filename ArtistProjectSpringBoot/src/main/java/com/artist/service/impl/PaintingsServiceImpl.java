package com.artist.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.artist.dto.response.PaintingDTO;
import com.artist.entity.Bidrecord;
import com.artist.entity.Paintings;
import com.artist.repository.BidrecordRepository;
import com.artist.repository.PaintingsRepository;
import com.artist.service.PaintingsService;
import com.artist.utils.IdGenerator;

@Service
public class PaintingsServiceImpl implements PaintingsService {

	@Autowired
	private IdGenerator idGenerator;

	@Value("${paintings.upload.date.totalday}")
	private int totalDay;

	@Value("${paintings.upload.date.canbidday}")
	private int canBidDay;

	@Autowired
	private PaintingsRepository ptr;
	@Autowired
	BidrecordRepository brr;

	@Override
	public void create(PaintingDTO paintingDTO) {
		Paintings painting = new Paintings();
		painting.setPaintingId(idGenerator.paintingId());
		painting.setPaintingName(paintingDTO.getPaintingName());
		painting.setArtistId(paintingDTO.getArtistId());
		painting.setLargUrl(paintingDTO.getLargUrl());
		painting.setSmallUrl(paintingDTO.getSmallUrl());
		painting.setPrice(paintingDTO.getPrice());
		painting.setDate(paintingDTO.getDate());
		painting.setStyle(paintingDTO.getStyle());
		painting.setUploadDate(LocalDateTime.now());
		painting.setGenre(paintingDTO.getGenre());
		painting.setDelicated(paintingDTO.getDelicated());
		painting.setStatus(paintingDTO.getStatus());
		painting.setImage(paintingDTO.getImage());

		ptr.save(painting);

	}

	@Override
	public void update(PaintingDTO paintingDTO) {
		String paintingid = paintingDTO.getPaintingId();
		if (!paintingid.isBlank()) {
			Paintings painting = new Paintings();
			painting.setPaintingId(paintingDTO.getPaintingId());
			painting.setPaintingName(paintingDTO.getPaintingName());
			painting.setArtistId(paintingDTO.getArtistId());
			painting.setPrice(paintingDTO.getPrice());
			painting.setDate(paintingDTO.getDate());
			painting.setStyle(paintingDTO.getStyle());
			painting.setUploadDate(LocalDateTime.now());
			painting.setGenre(paintingDTO.getGenre());
			painting.setDelicated(paintingDTO.getDelicated());
			painting.setStatus(paintingDTO.getStatus());
			painting.setImage(paintingDTO.getImage());

		} else {
			System.out.println("data not fond");
		}

	}

	@Override
	public List<PaintingDTO> getAll() {
		List<Paintings> paintings = ptr.findAll();

		return paintings.stream()
				.map(p -> new PaintingDTO(p.getPaintingId(), p.getPaintingName(), p.getArtist().getArtistId(),
						p.getArtist().getArtistName(), p.getLargUrl(), p.getSmallUrl(), p.getPrice(), p.getDate(),
						p.getStyle(), p.getUploadDate(), p.getGenre(), p.getDelicated(), p.getStatus(), p.getImage()))
				.collect(Collectors.toList());
	}

	@Override
	public List<PaintingDTO> getAllAvailablePainting() {
		List<Paintings> paintings = ptr.findAllDelicatedPaintingsWithArtist(totalDay);
		return paintings.stream()
				.map(p -> new PaintingDTO(p.getPaintingId(), p.getPaintingName(), p.getArtist().getArtistId(),
						p.getArtist().getArtistName(), p.getLargUrl(), p.getSmallUrl(), p.getPrice(), p.getDate(),
						p.getStyle(), p.getUploadDate(), p.getGenre(), p.getDelicated(), p.getStatus(), p.getImage()))
				.collect(Collectors.toList());
	}

	public Page<PaintingDTO> getPaintingsByPage(Integer pageSize, Integer currentPage) {
		Pageable pageable = PageRequest.of(currentPage, pageSize);
		Page<Paintings> paintingsPage = ptr.findAllDelicatedPaintingsWithArtist(pageable, totalDay);
		List<PaintingDTO> paintingDTOs = paintingsPage.getContent().stream()
				.map(p -> new PaintingDTO(p.getPaintingId(), p.getPaintingName(), p.getArtist().getArtistId(),
						p.getArtist().getArtistName(), p.getLargUrl(), p.getSmallUrl(), p.getPrice(), p.getDate(),
						p.getStyle(), p.getUploadDate(), p.getGenre(), p.getDelicated(), p.getStatus(), p.getImage()))
				.collect(Collectors.toList());
		return new PageImpl<>(paintingDTOs, pageable, paintingsPage.getTotalElements());
	}

	public Page<PaintingDTO> getAllInBidding(Integer pageSize, Integer currentPage) {
		Pageable pageable = PageRequest.of(currentPage, pageSize);
		Page<Paintings> paintingsPage = ptr.findAllInBidding(pageable);
		List<PaintingDTO> paintingDTOs = paintingsPage.getContent().stream()
				.map(p -> new PaintingDTO(p.getPaintingId(), p.getPaintingName(), p.getArtist().getArtistId(),
						p.getArtist().getArtistName(), p.getLargUrl(), p.getSmallUrl(), p.getPrice(), p.getDate(),
						p.getStyle(), p.getUploadDate(), p.getGenre(), p.getDelicated(), p.getStatus(), p.getImage()))
				.collect(Collectors.toList());
		return new PageImpl<>(paintingDTOs, pageable, paintingsPage.getTotalElements());
	}

	public Page<PaintingDTO> getAllInPresaleExhibition(Integer pageSize, Integer currentPage) {
		Pageable pageable = PageRequest.of(currentPage, pageSize);
		Page<Paintings> paintingsPage = ptr.findAllPresaleExhibition(pageable, canBidDay);
		List<PaintingDTO> paintingDTOs = paintingsPage.getContent().stream()
				.map(p -> new PaintingDTO(p.getPaintingId(), p.getPaintingName(), p.getArtist().getArtistId(),
						p.getArtist().getArtistName(), p.getLargUrl(), p.getSmallUrl(), p.getPrice(), p.getDate(),
						p.getStyle(), p.getUploadDate(), p.getGenre(), p.getDelicated(), p.getStatus(), p.getImage()))
				.collect(Collectors.toList());
		return new PageImpl<>(paintingDTOs, pageable, paintingsPage.getTotalElements());
	}

	@Override
	public Page<PaintingDTO> getAllforArtistIdByPage(Integer pageSize, Integer currentPage, String artistId) {
		Pageable pageable = PageRequest.of(currentPage, pageSize);
		Page<Paintings> pagePaintingsWithArtist = ptr.findAllDelicatedWithArtist(pageable, totalDay, artistId);
		List<PaintingDTO> paintingDTOs = pagePaintingsWithArtist.getContent().stream()
				.map(p -> new PaintingDTO(p.getPaintingId(), p.getPaintingName(), p.getArtist().getArtistId(),
						p.getArtist().getArtistName(), p.getLargUrl(), p.getSmallUrl(), p.getPrice(), p.getDate(),
						p.getStyle(), p.getUploadDate(), p.getGenre(), p.getDelicated(), p.getStatus(), p.getImage()))
				.collect(Collectors.toList());
		return new PageImpl<>(paintingDTOs, pageable, pagePaintingsWithArtist.getTotalElements());
	}

	@Override
	public Long findPaintingsTotalCount() {
		long countByDelicated = ptr.countByDelicated(totalDay);
		return countByDelicated;
	}

	@Override
	public Long findPresaleExhibitionTotalCount() {
		long countByDelicated = ptr.countByPresaleExhibition(canBidDay);
		return countByDelicated;
	}

	@Override
	public Long findInBiddingTotalCount() {
		long countByDelicated = ptr.countByInBidding(canBidDay);
		return countByDelicated;
	}

	public long countByDelicatedAndArtistId(String artistId) {
		long countByDelicatedAndArtistId = ptr.countByDelicated(totalDay, artistId);
		return countByDelicatedAndArtistId;
	}

	@Override
	public void updateUploadDate(String paintingId, LocalDateTime uploadDate) {
		Optional<Paintings> optionalPainting = ptr.findByPaintingId(paintingId);
		if (optionalPainting.isPresent()) {
			Paintings painting = optionalPainting.get();
			painting.setUploadDate(uploadDate);
			ptr.save(painting);
			System.out.println("更新成功");
		} else {
			System.out.println("找不到此 id 的畫");
		}
	}

	@Override
	public void setPaintingAvailable(String paintingId) {
		Optional<Paintings> optionalPainting = ptr.findByPaintingId(paintingId);
		if (optionalPainting.isPresent()) {
			Paintings painting = optionalPainting.get();
			System.out.println(painting.getPaintingId());
			painting.setDelicated(1);
			painting.setStatus("In Bidding");
			ptr.save(painting);
			System.out.println("更新成功");

		} else {
			System.out.println("找不到此 id 的畫");
		}

	}

	@Override
	public void setPaintingSold(String paintingId) {
		Optional<Paintings> optionalPainting = ptr.findById(paintingId);
		if (optionalPainting.isPresent()) {
			Paintings painting = optionalPainting.get();
			painting.setDelicated(0);
			ptr.save(painting);
			System.out.println("更新成功");
		} else {
			System.out.println("找不到此 id 的畫");
		}
	}

	@Override
	public PaintingDTO getByPaintingsId(String paintingId) {
		Optional<Paintings> painting = ptr.findById(paintingId);
		if (painting.isPresent()) {
			Paintings paintings = painting.get();
			return new PaintingDTO(paintings.getPaintingId(), paintings.getPaintingName(),
					paintings.getArtist().getArtistId(), paintings.getArtist().getArtistName(), paintings.getLargUrl(),
					paintings.getSmallUrl(), paintings.getPrice(), paintings.getDate(), paintings.getStyle(),
					paintings.getUploadDate(), paintings.getGenre(), paintings.getDelicated(), paintings.getStatus(),
					paintings.getImage());
		} else {
			System.out.println("No painting found for ID: " + paintingId);
			return null;
		}
	}

	@Override
	public List<PaintingDTO> getByPaintingsName(String paintingName) {
		List<Paintings> listPaintingId = ptr.findByPaintingName(paintingName);
		if (listPaintingId.isEmpty()) {
			return Collections.emptyList();
		}
		return listPaintingId.stream()
				.map(painting -> new PaintingDTO(painting.getPaintingId(), painting.getPaintingName(),
						painting.getArtist().getArtistId(), painting.getArtist().getArtistName(), painting.getLargUrl(),
						painting.getSmallUrl(), painting.getPrice(), painting.getDate(), painting.getStyle(),
						painting.getUploadDate(), painting.getGenre(), painting.getDelicated(), painting.getStatus(),
						painting.getImage()))
				.collect(Collectors.toList());
	}

	@Override
	public void delete(String paintingId) {
		ptr.deleteById(paintingId);
	}

	@Override
	public boolean existsBypaintingId(String paintingId) {
		return ptr.existsBypaintingId(paintingId);
	}

	@Override
	public List<PaintingDTO> findPaintingAndArtistPartOfName(String keyword) {
		List<Paintings> paintingAndArtistPartOfName = ptr.findPaintingAndArtistPartOfName(totalDay, keyword);

		if (paintingAndArtistPartOfName.isEmpty()) {
			return Collections.emptyList();
		}
		return paintingAndArtistPartOfName.stream()
				.map(painting -> new PaintingDTO(painting.getPaintingId(), painting.getPaintingName(),
						painting.getArtist().getArtistId(), painting.getArtist().getArtistName(), painting.getLargUrl(),
						painting.getSmallUrl(), painting.getPrice(), painting.getDate(), painting.getStyle(),
						painting.getUploadDate(), painting.getGenre(), painting.getDelicated(), painting.getStatus(),
						painting.getImage()))
				.collect(Collectors.toList());
	}

	@Override
	public List<PaintingDTO> getUpcomingAuction() {
		List<Paintings> upcomingAuction = ptr.findPaintingsClosingSoon();
		if (upcomingAuction.isEmpty()) {
			return Collections.emptyList();
		}
		return upcomingAuction.stream()
				.map(painting -> new PaintingDTO(painting.getPaintingId(), painting.getPaintingName(),
						painting.getArtist().getArtistId(), painting.getArtist().getArtistName(), painting.getLargUrl(),
						painting.getSmallUrl(), painting.getPrice(), painting.getDate(), painting.getStyle(),
						painting.getUploadDate(), painting.getGenre(), painting.getDelicated(), painting.getStatus(),
						painting.getImage()))
				.collect(Collectors.toList());

	}

	@Override
	public List<PaintingDTO> getRecentlyUploaded() {
		List<Paintings> recentlyUploaded = ptr.findRecentlyUploaded();
		if (recentlyUploaded.isEmpty()) {
			return Collections.emptyList();
		}
		return recentlyUploaded.stream()
				.map(painting -> new PaintingDTO(painting.getPaintingId(), painting.getPaintingName(),
						painting.getArtist().getArtistId(), painting.getArtist().getArtistName(), painting.getLargUrl(),
						painting.getSmallUrl(), painting.getPrice(), painting.getDate(), painting.getStyle(),
						painting.getUploadDate(), painting.getGenre(), painting.getDelicated(), painting.getStatus(),
						painting.getImage()))
				.collect(Collectors.toList());

	}

	@Override
	public void updatePrice(String paintingId, Double price) {
		Optional<Paintings> byId = ptr.findById(paintingId);
		Paintings paintings = byId.get();
		paintings.setPrice(price);
		ptr.save(paintings);
	}

	@Override
	public Paintings getOnePaintingsById(String paintingId) {
		Optional<Paintings> byId = ptr.findById(paintingId);
		Paintings paintings = byId.get();
		return paintings;
	}

	@Override
	public byte[] getPaintingBlob(String paintingId) {
		Optional<Paintings> painting = ptr.findById(paintingId);
		return painting.map(Paintings::getImage).orElse(null);
	}

	@Override
	public List<PaintingDTO> getPaintingsByBidrecords() {
		List<Paintings> paintingsByGroupedBidrecords = ptr.findPaintingsByBidrecords();
		if (paintingsByGroupedBidrecords.isEmpty()) {
			return Collections.emptyList();
		}
		return paintingsByGroupedBidrecords.stream()
				.map(painting -> new PaintingDTO(painting.getPaintingId(), painting.getPaintingName(),
						painting.getArtist().getArtistId(), painting.getArtist().getArtistName(), painting.getLargUrl(),
						painting.getSmallUrl(), painting.getPrice(), painting.getDate(), painting.getStyle(),
						painting.getUploadDate(), painting.getGenre(), painting.getDelicated(), painting.getStatus(),
						painting.getImage()))
				.collect(Collectors.toList());
	}

	public void setSatusfinished(String paintingId) {
		Optional<Paintings> optionalPainting = ptr.findById(paintingId);
		if (optionalPainting.isPresent()) {
			Paintings painting = optionalPainting.get();

			painting.setDelicated(0);

			List<Bidrecord> paintingList = brr.findByPaintingId(paintingId);

			boolean exists = paintingList.stream().anyMatch(bid -> bid.getPaintingId().equals(paintingId));
			painting.setStatus(exists ? "Auction closed" : "Unsold");
			ptr.save(painting);
		} else {
			System.out.println("找不到此 id 的畫");
		}
	}

	public Paintings savePaintingWithImage(Paintings painting, String filePath) throws IOException {
		byte[] imageData = Files.readAllBytes(new File(filePath).toPath());
		painting.setImage(imageData);
		return painting;
	}

	public Paintings saveImage(MultipartFile file) throws IOException {
		return null;

	}

}
