export interface User {
    nome: string;
    nome_usuario: string;
    foto_usuario?: string;
    descricao?: string;
    email: string;
    senha: string;
    cpf: string;
    data_nascimento: string; 
    telefone: string;
    disponibilidade?: boolean;
}

export interface Address {
    id_endereco: number;
    logradouro: string;
    numero_casa: number;
    complemento?: string;
    bairro: string;
    estado: string;
    cidade: string;
    cep?: string;
    status: boolean;
};





