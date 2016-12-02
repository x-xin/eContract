Mock.mock('/list', {
    'success': '1',
	'result|10':[{
	    'title'        :  '@ctitle(30)',
	    'date'         :  '@date',
	    'count|1-1000' :   100,
	    "imgurl"       :   Mock.Random.image('133x88'),
        'url'          :   '/smallsite/doc/details.html'
    }]
});