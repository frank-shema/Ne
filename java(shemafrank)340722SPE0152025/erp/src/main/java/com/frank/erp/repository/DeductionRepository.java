package com.frank.erp.repository;

import com.frank.erp.model.Deduction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeductionRepository extends JpaRepository<Deduction, Long> {

    Optional<Deduction> findByCodeIgnoreCase(String code);

    Optional<Deduction> findByDeductionNameIgnoreCase(String deductionName);

    boolean existsByCodeIgnoreCase(String code);

    boolean existsByDeductionNameIgnoreCase(String deductionName);
}
