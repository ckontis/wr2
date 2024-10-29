package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.UserOrder;
import java.util.List;

public interface UserOrderRepository extends JpaRepository<UserOrder, Long> {

    List<UserOrder> findByUserAccountId(Long userId);

    // void deleteAllByUserAccountId(Long id);

    // void deleteAllByProductId(Long id);
}
