package main.java.com.example.demo.repository.Cliente;

import java.util.ArrayList;

import main.java.com.example.demo.repository.Usuario.Usuario;
import main.java.com.example.demo.repository.Endereco.Endereco;
import main.java.com.example.demo.repository.Rendimento.Rendimento;

public class Cliente extends Usuario {
    private String RG;
    private String CPF;
    private String profissao;
    private Endereco endereco;
    private ArrayList<Rendimento> redimentos;
}
