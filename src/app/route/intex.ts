import express from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/Registration/user.route';


import { BookRoutes } from '../modules/Books/book.route';
import { GenreRoutes } from '../modules/Genres/genre.route';
import { ReviewRoutes } from '../modules/Reviews/review.route';
import { RatingRoutes } from '../modules/Ratings/rating.route';
import { ShelfRoutes } from '../modules/Shelf/shelf.route';
import { TutorialRoutes } from '../modules/Tutorials/tutorial.route';
import { RecommendationRoutes } from '../modules/Recommendations/recommendation.route';



const router=express.Router()



const modulerRoutes=[

    {
        path:'/auth',
        route:UserRoutes,
        
    },
    {
        path:'/auth',
        route:AuthRoutes,
        
    },
   
   
    
    {
        path:'/books',
        route:BookRoutes,
        
    },
    {
        path:'/genres',
        route:GenreRoutes,
        
    },
    {
        path:'/reviews',
        route:ReviewRoutes,
        
    },
    {
        path:'/ratings',
        route:RatingRoutes,
        
    },
    {
        path:'/shelf',
        route:ShelfRoutes,
        
    },
    {
        path:'/tutorials',
        route:TutorialRoutes,
        
    },
    {
        path:'/recommendations',
        route:RecommendationRoutes,
        
    },
   

]

modulerRoutes.forEach(route=>{
    router.use(route.path,route.route)
    console.log(`Route registered: ${route.path}`)
})

export default router