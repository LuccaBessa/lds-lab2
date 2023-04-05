package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Aluguel;

@Repository
public interface AluguelRepository extends JpaRepository<Aluguel, Integer>{

    @Query(nativeQuery = true, value = "SELECT * FROM aluguel a WHERE a.cliente = :id")
    List<Aluguel> findByUser_id(@Param("id") Integer id);
}
