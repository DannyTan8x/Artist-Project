package com.artist.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.artist.entity.DeliveryOrders;



public interface DeliveryOrdersRepository extends JpaRepository<DeliveryOrders, String> {
    
	
	@Query("SELECT d FROM DeliveryOrders d " +
		       "JOIN d.orders o " +
		       "JOIN o.orderDetail od")
	List<DeliveryOrders> findAllWithOrdersAndDetails();
	

	@Query("SELECT d FROM DeliveryOrders d " +
		       "JOIN d.orders o " +
		       "JOIN o.orderDetail od " +
		       "WHERE d.deliveryNumber = :deliveryNumber")
	Optional<DeliveryOrders> findByDeliveryNumberWithOrdersAndDetails(@Param("deliveryNumber") String deliveryNumber);    

	@Query("SELECT d FROM DeliveryOrders d " +
		       "JOIN d.orders o " +
		       "JOIN o.orderDetail od " +
		       "WHERE d.status = :status")
	List<DeliveryOrders> findByStatusWithOrdersAndDetails(@Param("status") String status);    


	@Query(nativeQuery = true, value = "SELECT s.staff_name FROM deliveryorders d join staff s on  d.delivery_staff=s.staff_username where d.delivery_staff=:staffId")
    String findByDeliveryStaff(@Param("staffId") String staffId);

    @Query(nativeQuery = true, value = "SELECT s.staff_name FROM deliveryorders d join staff s on  d.package_staff=s.staff_username where d.package_staff=:staffId")
    String findByPackageStaff(@Param("staffId") String staffId);
    
    @Query(value = """
    	    SELECT 
    	        o.customer_id,
    	        d.delivery_number,
    	        d.create_date,
    	        d.status,
    	        d.att_name,
    	        d.delivery_address,
    	        d.delivery_instrictions,
    	        d.total_amount,
    	        p.painting_id,
    	        p.painting_name,
    	        a.artist_name,
    	        p.image
    	    FROM deliveryorders d
    	    JOIN orders o ON d.delivery_number = o.delivery_number 
    	    JOIN orderdetails os ON o.order_number = os.order_number
    	    JOIN paintings p ON os.painting_id = p.painting_id 
    	    JOIN artist a ON a.artist_id = p.artist_id
    	    WHERE o.customer_id = :customerId
    	""",nativeQuery = true)
    List<Object[]> findByDeliveryNumberAndCustomer(@Param("customerId") String customerId);
 
    
}


