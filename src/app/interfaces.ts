export interface Luminaria {
    id: number,
    situacao: SituacaoLuminaria,
    posicaoGPS: {lat: number, lng: number},
    potenciaAtual: number,
    alertaIncendio: boolean,
    dataAtualizacao: Date
}

export enum SituacaoLuminaria {
    Disponivel = 'Disponível',
    AguardandoInstalacao = 'Aguardando Instalação',
    Instalada = 'Instalada',
    Manutencao = 'Manutenção',
    Arquivada = 'Arquivada'
}