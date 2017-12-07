$.extend(true, $.fn.dataTable.defaults, {
	dom: '<"content-box-normal"lf>rt<"dataTables_footer"ip>',
	lengthMenu: [[10, 25, 50, 100, 250, 500, -1], [10, 25, 50, 100, 250, 500, "All"]],
	pageLength: 10,
	autoWidth: false,
	language: {
		search: '',
		searchPlaceholder: 'Search...'
	},
	stateSave: true,
	stateDuration: 0,
	deferRender: true
});