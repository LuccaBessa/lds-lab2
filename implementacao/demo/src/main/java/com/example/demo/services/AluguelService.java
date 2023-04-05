package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Aluguel;
import com.example.demo.repositories.AluguelRepository;

import jakarta.transaction.Transactional;

@Service
public class AluguelService {
    
    @Autowired
    private AluguelRepository aluguelRepository;

    @Transactional
    public Aluguel create(Aluguel obj) {
        obj.setId(null);
        obj = this.aluguelRepository.save(obj);
        return obj;
    }

    public Aluguel findById(Integer id) {
        Optional<Aluguel> aluguel = this.aluguelRepository.findById(id);
        return aluguel.orElseThrow(() -> new RuntimeException("Aluguel não encontrado"));
    }

    public Aluguel update(Aluguel obj) {
        Aluguel newObj = findById(obj.getId());
        newObj.setStatus(obj.getStatus());
        return this.aluguelRepository.save(newObj);
    }
}
