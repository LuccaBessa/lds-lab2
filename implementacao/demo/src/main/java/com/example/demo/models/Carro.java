package com.example.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "carro")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Carro {
    
    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ano", nullable = false, length = 12)
    private String ano;

    @Column(name = "ano", nullable = false, length = 12)
    private String marca;

    @Column(name = "ano", nullable = false, length = 12)
    private String modelo;

    @Column(name = "ano", nullable = false, length = 12)
    private String placa;
}
