using AutoMapper;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;

namespace ANWAAR.CORE
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //CreateMap<Product, ProductVM>().ReverseMap();
            //CreateMap<ProductCategory, ProductVM>().ReverseMap();
            //CreateMap<Product, ProductVM>();
            CreateMap<Job, AddJobDTO>().ReverseMap();


        }
    }
}
