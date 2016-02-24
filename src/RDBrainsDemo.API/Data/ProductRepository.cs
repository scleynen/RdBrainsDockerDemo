using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RDBrainsDemo.Models;

namespace RDBrainsDemo.Data
{
    public class ProductRepository : IProductRepository
    {
        private static IList<Product> _productList;

        public ProductRepository()
        {
            _productList = new List<Product>();

            _productList.Add(new Product()
            {
                Id = 1,
                Name = "Product1",
                Price = 100,
                Description = "Description of product1"

            });

            _productList.Add(new Product()
            {
                Id = 2,
                Name = "Product2",
                Price = 1000,
                Description = "Ver expensive product"

            });


            _productList.Add(new Product()
            {
                Id = 3,
                Name = "Product3",
                Price = 5,
                Description = "Very cheap product"

            });



        }
        public Product Get(int id)
        {
            return _productList.FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<Product> GetAll()
        {
            return _productList;
        }
    }
}
