import { MUIDataTableTextLabels } from 'mui-datatables';

export const textLabelsPtBr: Partial<MUIDataTableTextLabels> = {
	toolbar: { search: 'Pesquisar', print: 'Imprimir', filterTable: 'Filtrar Tabela' },
	filter: { title: 'Filtros', all: 'Todos', reset: 'Limpar' },
	body: {
		noMatch: 'Sem resultados',
		toolTip: 'Ordenar',
	},
	pagination: {
		rowsPerPage: 'Linhas por página',
		next: 'Próxima Página',
		previous: 'Página Anterior',
	},
};
