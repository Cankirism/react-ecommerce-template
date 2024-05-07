import * as YUP from 'yup'
export const productAddingSchema = YUP.object().shape({
name:YUP.string().required("Ürün adı alanı zorunlu"),
brand:YUP.string().required("Marka adı alanı zorunlu"),
description:YUP.string().required("Ürün açıklamasını giriniz"),
price:YUP.number().required("Birim Fiyatı Giriniz"),
piece:YUP.number().required("Stok miktarı girilmelidir")

})

