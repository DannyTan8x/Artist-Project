package com.artist.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.artist.entity.Paintings;

public interface PaintingsRepository extends JpaRepository<Paintings, String> {

	Optional<Paintings> findByPaintingId(String paintingId);

	List<Paintings> findByPaintingName(String paintingName);

	@Query(value = "SELECT p.*, a.artist_name AS artistName FROM paintings p JOIN artist a ON p.artist_id = a.artist_id WHERE p.upload_date > NOW() - INTERVAL :totalDay DAY ORDER BY p.painting_id", nativeQuery = true)
	List<Paintings> findAllDelicatedPaintingsWithArtist(@Param("totalDay") int totalDay);

	@Query(value = "SELECT p.*, a.artist_name FROM paintings p JOIN artist a ON p.artist_id = a.artist_id WHERE p.upload_date > NOW() - INTERVAL :totalDay DAY ORDER BY p.painting_id", nativeQuery = true)
	Page<Paintings> findAllDelicatedPaintingsWithArtist(Pageable pageable, @Param("totalDay") int totalDay);

	@Query(value = "SELECT p.*, a.artist_name FROM Paintings p JOIN artist a ON p.artist_id = a.artist_id WHERE p.upload_date > NOW() - INTERVAL :canBidDay DAY AND p.upload_date <= NOW() ", nativeQuery = true)

	Page<Paintings> findAllPresaleExhibition(Pageable pageable, @Param("canBidDay") int canBidDay);

	@Query(value = "SELECT p.*, a.artist_name FROM paintings p JOIN artist a ON p.artist_id = a.artist_id WHERE p.upload_date > NOW() - INTERVAL 2 DAY ORDER BY p.painting_id", nativeQuery = true)
	Page<Paintings> findAllInBidding(Pageable pageable);

	@Query(value = "SELECT COUNT(*) FROM paintings p WHERE p.upload_date > NOW() - INTERVAL :totalDay DAY", nativeQuery = true)
	long countByDelicated(@Param("totalDay") int totalDay);

	@Query(value = "SELECT COUNT(*) FROM Paintings p WHERE p.upload_date > NOW() - INTERVAL :canBidDay DAY AND p.upload_date <= NOW()", nativeQuery = true)
	long countByPresaleExhibition(@Param("canBidDay") int canBidDay);

	@Query(value = "SELECT COUNT(*) FROM Paintings p WHERE p.upload_date > NOW() - INTERVAL :canBidDay DAY", nativeQuery = true)
	long countByInBidding(@Param("canBidDay") int canBidDay);

	@Query(value = "SELECT p.*, a.artist_name FROM Paintings p JOIN artist a ON p.artist_id = a.artist_id WHERE p.upload_date > NOW() - INTERVAL :totalDay DAY AND p.artist_Id = :artistId", nativeQuery = true)
	Page<Paintings> findAllDelicatedWithArtist(Pageable pageable, @Param("totalDay") int totalDay,
			@Param("artistId") String artistId);

	@Query(value = "SELECT COUNT(*) FROM paintings p WHERE p.upload_date > NOW() - INTERVAL :totalDay DAY AND p.artist_id = :artistId", nativeQuery = true)
	long countByDelicated(@Param("totalDay") int totalDay, @Param("artistId")String artistId);

	boolean existsBypaintingId(String paintingId);

	@Query(value = "SELECT p.* FROM paintings p JOIN artist a ON p.artist_id = a.artist_id WHERE p.upload_date > NOW() - INTERVAL :totalDay DAY AND (p.painting_name LIKE CONCAT('%', :keyword, '%') OR a.artist_name LIKE CONCAT('%', :keyword, '%')) ORDER BY p.painting_id", nativeQuery = true)
	List<Paintings> findPaintingAndArtistPartOfName(@Param("totalDay") int totalDay, @Param("keyword") String keyword);

	@Query(value = "SELECT * FROM paintings p "
			+ "WHERE TIMESTAMPDIFF(HOUR, CURRENT_TIMESTAMP, DATE_ADD(p.upload_date, INTERVAL 3 DAY)) <= 24 "
			+ "AND TIMESTAMPDIFF(HOUR, CURRENT_TIMESTAMP, DATE_ADD(p.upload_date, INTERVAL 3 DAY)) >= 0 "
			+ "ORDER BY TIMESTAMPDIFF(HOUR, CURRENT_TIMESTAMP, DATE_ADD(p.upload_date, INTERVAL 3 DAY)) ASC", nativeQuery = true)
	List<Paintings> findPaintingsClosingSoon();

	@Query(value = "SELECT * FROM paintings p " + "WHERE TIMESTAMPDIFF(HOUR, p.upload_date, CURRENT_TIMESTAMP) <= 24 "
			+ "ORDER BY p.upload_date DESC", nativeQuery = true)
	List<Paintings> findRecentlyUploaded();

	Optional<Paintings> findByPaintingIdAndDelicated(String paintingId, Integer Delicated);

	@Query(value = "SELECT p.* FROM paintings p WHERE p.painting_id IN (SELECT b.painting_id FROM bidrecord b) AND p.painting_id NOT IN (SELECT o.painting_id FROM orderdetails o)", nativeQuery = true)
	List<Paintings> findPaintingsByBidrecords();

}
