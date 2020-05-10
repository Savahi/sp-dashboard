var _iconSynchronized="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD4UlEQVR42u3dyXakSBBFwYQvzz+XtlooByCC8MHuqtcFpueoT1c/HpIkSZIkSZIkSZIkSZIkSZIkSZJUpM0fgSL1fD5//vzzBoj0D44oSABRaCCroQCi8DhWIgFEKXCsgrJ7PKoOyoKo5ct+x5IAovRLMBMKICpxJs1CAohKfUeMhgKIyn1kj0QCiErhGA3Fr3kFowVRt/UYtSaAqDyOK0icWILUgqj7epxdE0DUDscRJICoJY5vofgGEchvIAOi1uvxKUAEByDSuW8QH+lqvR6ffpMFiOBwYknnsiCyHoAIjuM4nFiSBZH1OLcegAgOQATH+f+i0DeIZEFkPQARHENxOLEkCyLrAYjgGI7DiaWSOEYGiCqC9pdXy3rMxgGI4HBiSRZE1sP/gk1w3InDiSVZEFkPQASHE0tyYsl6BFkPQAQHIILDN4hkQWQ9ABEcQXA4sSQLIusBiOBwYkkWRNYjyHoAAgcYTix1/mt7AJGcWPLdAYjgCPc+OrEkC2I9rAcggsOJpVo4ogeIrIcTy3rAAQgccDixJAsi6wGI4HBiSWlxAGI95MSCw3pYEMmCKN96ZF0OQOCAAxA4IAn+DeI3La1BW5BvcVT4w7IevXBMBfLqgYIChxPLyaUibSsRWBPr0Q7I0QcKCRxOrA8vgbPLKdoCyJWH6oVID7rkJbBFwOHkclqVBjLjgXaFAodvECeX+izIHS9ylzWxHsWA3PlAqz8MOJxYl18gZ5fSLMjKl7XaTy/rUQxIhAda5SHB4cRychXB0bE9+0P1klmPMCdW9Jcx0wN0WhUDkuWBZniQcPgG8W2iPguS9YWL+JPPehQDUuA3RRsccDixgp9czr6CQCo9VC+o9Rh6YlV+oe5++E4rJ5Y1UZ8F6fQCzf5paT2KAen403XWSwGHBYEEjp4f6aAAogb/onDFywJHIyCgwNG53R+kHwoasCCdX5xvfzhYD0CcXHA4sfwBH0PgFLMg1uTNDwjrAQgkL140OAABpdkvGzTgG8RDkAWxJtYDkOkPBhI4nFgejiyINbEegEACh5YBAQUQQCCBAxBI4AAEFDhat3uwUoIFsSZ+yAACCRyAgAIIIJDAAQgkcACS74UABRBAIIEDEFDgAAQSOAABBRBAIIEDEEjgUF0glaEAAggkcAACChxZ2psA8YLJglRcE7gtiOCwIFYEDkBAAQQQSOAABBQ45CPdiykLkmZJIAUEFDicWE4uWRBrAiMgmo0EDkAggQMQUAABRMOgwAEIJHCkz695nUmyIHGWBChAQIEDEB2HAgggeoEEDunCt4kkSZIkSZIkSZIkSZIkSVX7BU50vGhqiex/AAAAAElFTkSuQmCC";
var _iconNotSynchronized="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACh0lEQVR42u3dsVLCQBQF0Ld3trDN1xgqx1+is0E7rIAv8RvsUH8mrV0sxBnHQSEka+57e2/JQLIvb0/CUixmiqIoiqIoTFk2TYpQRw7SiLWZPZnZm6YmR1P6ZdPsI9SSAui4N7PVoZZ203WvnmuC58Fvuq4/NORrYu0kZF4dqx8NMe9K4FzHw5FJtZMQHh3ulSCYDvdKUkAdrpUgoA7XSlJQHW6VIKgOt0pSYB0ulSCwDpdKUnAd7pQguA53SlIFOlwpQQU6XCmBAyGPZtZPcKh22TTXasj43Ex4a92pIeN0tGbWTnhIeiXsQrZHXhty++q9KUnkOva/POjTmcfovX3jgjMdU4VWCYh1tAVPQfssQYU6qJWgQh3USlCpDlolqFQHrRJUrINSCSrWQakEleugU4LKddApgXRwKYF0cCmBdHApgXRwKYF0cCmBdHApgXRwKcFMOq5JdcyuBLXNQPYxQjq4lEA6uMYK6eBSAungGjOkg0sJpINr7JAOLiWQDq4aIB1cSiAdXLVAOriUQDq4aoJ0cCmBdHDVVrIhbeCGFFMy+UbK37Zu7c35NrRnKFnQCzmydauUzCWkIh3FlEA6uJRk6eBSAungUpKlg0sJpINLSZYOLiWTXMA/9hQplTszuzrxnnf7/Oed/8xi03UvswmZUceaVMl2rJLkUAd7RinJDnWwZ5SSJB1cSrJDHUPOOZfei5Ukjzom2FGOVkl2piP8swQXzM7aV+VDVu9tUSHSUV4JpINLSZYOLiWQDi4leYCOlXSUV3L2xSVblbP+2jt6XZKd6lhHVZIc6vCck0qynh1cSpJ0cCnJ0sGlJEnHLLnddN3zoE8chCiKoiiKoihKgHwALlMamlSNyGoAAAAASUVORK5CYII=";

var helpTextEn = "<div>\
	<div><b><i>\"The Home Page of Projects\"</i></b> aggregates ones uploaded by a user onto remote folders via FTP or SFTP.<div/><br/><br/>\
	<div>Click an item in the list of projects open the one chosen in a new tab or a window of your browser.<div/><br/><br/>\
	<div>In the upper right of the page there is a logout link <b>[→]</b> you may use for safety reasons after finishing your work with the projects.<div/><br/><br/>\
	<div class='clearfix'></div></div>";

var helpTextRu = "<div>\
	<div><b><i>\"Домашняя страница\"</i></b> проеков содержит проекты, выгруженные пользователем из Spider Project в удаленные папки по протоколам FTP или SFTP.<div/><br/><br/>\
	<div>Щелчок мыши по элементу списка проектов откроет соответствующий проект в новой вкладке или новом окне вашего браузера.<div/><br/><br/>\
	<div>В правом верхем углу страницы размещена ссылка для выхода (сброса авторизации) <b>[→]</b>, которую вы можете использовать по окончании работы с проектами.<div/><br/><br/>\
	<div class='clearfix'></div></div>";

var _texts = { 
	'en': { 
		helpText:helpTextEn,
		helpTitle:"HELP PAGE",
		pageName:'DASHBOARD',
		version: 'Version',
		waitLoadingDashboard:'PLEASE WAIT WHILE LOADING THE DASHBOARD...',
		errorLoadingDashboard:'ERROR LOADING DASHBOARD...'
	},
	'ru': { 
		helpText:helpTextRu,
		helpTitle:"СПРАВКА",
		pageName:'ДЭШБОАРД',
		version: 'Версия',
		waitLoadingDashboard:'ПОЖАЛУЙСТА, ПОДОЖДИТЕ, ПОКА ЗАГРУЖАЕТСЯ ДЭШБОРД...',
		errorLoadingDashboard:'ОШИБКА ЗАГРУЗКИ ДЭШБОРДА...'
	}
};
