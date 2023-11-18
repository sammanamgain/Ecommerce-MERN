class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
    }
    filter() {
        const querycopy = { ...this.queryStr };
         // console.log(querycopy);
  
      const { keyword, page, limit, ...rest } = querycopy;
      //console.log(rest);
      let str = JSON.stringify(rest);
      const updatedQuery = str.replace(/\b(gt|gte|lt|lte)\b/g, key=>`$${key}`);
 

        this.query = this.query.find(JSON.parse(updatedQuery));
        return this;
  }
  pagination(pageresult) {
    const currentpage = Number(this.queryStr.page) || 1;
    console.log(currentpage)
    
    const skip = pageresult * (currentpage - 1);
    console.log(skip)
    this.query = this.query.limit(pageresult).skip(skip);
    return this;
    
  }

}
module.exports = ApiFeatures;
