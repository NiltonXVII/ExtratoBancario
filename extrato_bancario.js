document.addEventListener('DOMContentLoaded', () => {
    const transacoes = [
        {data: '2025-08-28', descricao: 'Débito Automático - Fatura de Água', valor: -15.50, tipo: 'saida'},
        {data: '2025-08-27', descricao: 'Pagamento via Pix - Restaurante', valor: -45.90, tipo: 'saida'},
        {data: '2025-08-25', descricao: 'Crédito - DOC/TED Recebido', valor: 300.00, tipo: 'entrada'},
        {data: '2025-08-22', descricao: 'Pagamento de Fatura - Cartão de Crédito', valor: -850.00, tipo: 'saida'},
        {data: '2025-08-20', descricao: 'Débito - Compra no Supermercado', valor: -358.70, tipo: 'saida'},
        {data: '2025-08-15', descricao: 'Crédito - Adiantamento Salarial', valor: 1680.00, tipo: 'entrada'},
        {data: '2025-08-12', descricao: 'Compra no Débito - Lazer', valor: -55.00, tipo: 'saida'},
        {data: '2025-08-10', descricao: 'Saque em Dinheiro - Caixa Eletrônico', valor: -200.00, tipo: 'saida'},
        {data: '2025-08-05', descricao: 'Crédito de Salário - Empresa X', valor: 2520.00, tipo: 'entrada'},
        {data: '2025-08-05', descricao: 'Transferência via Pix - Aluguel', valor: -1200.00, tipo: 'saida'},
        {data: '2025-08-01', descricao: 'Débito Recorrente - Serviço de Streaming', valor: -39.90, tipo: 'saida'},
    ];

    const botao_filtrar = document.getElementById('botao_filtrar');
    const tipo_transacao_select = document.getElementById('tipo_transacao');
    const corpo_tabela_transacoes = document.getElementById('corpo_tabela_transacoes');

    const resumo_saldo_anterior = document.getElementById('resumo_saldo_anterior');
    const resumo_entradas = document.getElementById('resumo_entradas');
    const resumo_saidas = document.getElementById('resumo_saidas');
    const resumo_saldo_final = document.getElementById('resumo_saldo_final');

    const saldo_anterior_fixo = 5922.40;

    function formatar_moeda(valor) {
        return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }

    function formatar_data(data_string) {
        const [ano, mes, dia] = data_string.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    function renderizar_transacoes(transacoes_filtradas) {
        corpo_tabela_transacoes.innerHTML = '';
        if (transacoes_filtradas.length === 0) {
            corpo_tabela_transacoes.innerHTML = `<tr><td colspan="3" class="text-center p-5 text-secondary">Nenhuma transação encontrada para os filtros selecionados.</td></tr>`;
            return;
        }

        transacoes_filtradas.forEach(t => {
            const e_entrada = t.tipo === 'entrada';
            const classe_valor = e_entrada ? 'text-success' : 'text-danger';
            const linha = `
                    <tr>
                        <td class="py-3 text-secondary">${formatar_data(t.data)}</td>
                        <td class="py-3">${t.descricao}</td>
                        <td class="py-3 text-end fw-semibold ${classe_valor}">${formatar_moeda(t.valor)}</td>
                    </tr>
                `;
            corpo_tabela_transacoes.innerHTML += linha;
        });
    }

    function atualizar_resumo(transacoes_filtradas) {
        const total_entradas = transacoes_filtradas
            .filter(t => t.tipo === 'entrada')
            .reduce((acc, t) => acc + t.valor, 0);

        const total_saidas = transacoes_filtradas
            .filter(t => t.tipo === 'saida')
            .reduce((acc, t) => acc + t.valor, 0);

        const saldo_final = saldo_anterior_fixo + total_entradas + total_saidas;

        resumo_saldo_anterior.textContent = formatar_moeda(saldo_anterior_fixo);
        resumo_entradas.textContent = `+ ${formatar_moeda(total_entradas)}`;
        resumo_saidas.textContent = `- ${formatar_moeda(Math.abs(total_saidas))}`;
        resumo_saldo_final.textContent = formatar_moeda(saldo_final);
    }

    function aplicar_filtros() {
        const tipo = tipo_transacao_select.value;

        const filtradas = transacoes.filter(t => {
            if (tipo === 'todas') return true;
            if (tipo === 'entradas') return t.tipo === 'entrada';
            if (tipo === 'saidas') return t.tipo === 'saida';
            return false;
        });

        renderizar_transacoes(filtradas);
        atualizar_resumo(filtradas);
    }

    botao_filtrar.addEventListener('click', aplicar_filtros);
    aplicar_filtros();
});