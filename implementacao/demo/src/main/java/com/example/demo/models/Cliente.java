package com.example.demo.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cliente")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Cliente {
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", referencedColumnName = "usuario")
    private Integer cliente_id;

    @Column(name = "rg", length = 20, nullable = false, unique = true)
    private String rg;

    @Column(name = "cpf", length = 20, nullable = false, unique = true)
    private String cpf;

    @Column(name = "profissao", length = 65, nullable = true)
    private String profissao;

    @Column(name = "rendimento", length = 50, nullable = false)
    private String rendimento;

    @Column(name = "endereco", length = 255, nullable = false)
    private String endereco;
}   
