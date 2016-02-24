using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using RDBrainsDemo.Models;
using RDBrainsDemo.Data;

namespace RDBrainsDemo.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private IProductRepository _productRepository;
        public ProductsController()
        {
            _productRepository = new ProductRepository();
        }
        // GET: api/products
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _productRepository.GetAll();
        }
 
    }
}
