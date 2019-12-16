import React from 'react';
import axios from "axios";
import Lecture from "./Lecture";
import Pagination from "./Pagination";
import './App.css';

class App extends React.Component {

  state = {
    url: "https://raw.githubusercontent.com/doorisopen/kpu-schedule-app/master/data/",
    gubun: "G.json",
    currentPage: 1,
    postsPerPage: 15,
    isLoading: true,
    lectures: [],
  };

  // async: 이 함수가 비동기라는것을 말해주는것이고 await은 axios로 fetch 해온 data를 모두 로드 할때 까지 기다리라는 말임
  getLectures = async() => {
    const { url, gubun } = this.state;
    const {
      data : { 
        lectures 
      }
    /* AWS Server */ 
    // http://13.125.253.127:8080/kpu-schedule/
    // "https://raw.githubusercontent.com/doorisopen/kpu-schedule-app/master/data/A.json"
    } = await axios.get( url + gubun );

    console.log(lectures);
    console.log("gubun : ", gubun);
    
    // state-> lectures:lectures <- axios에서 가져온 lectures임
    this.setState({ lectures, isLoading: false });
  };

  // componentDidMount: component가 생성되고 호출되는 life Cycle
  componentDidMount() {
    this.getLectures();
  }

  render() {
    const { currentPage, postsPerPage, isLoading, lectures } = this.state;

    // Get current lectures
    const indexOfLastLecture = currentPage * postsPerPage;
    const indexOfFirstLecture = indexOfLastLecture - postsPerPage;
    const currentLectures = lectures.slice(indexOfFirstLecture, indexOfLastLecture);

    // Change Page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <div className="lecture-page">
        <header className="lecture-page-header">
          한국산업기술대학교 강의 시간표 만들기
        </header>
          <section className="lecture-container">
            {isLoading ? (
              <div className="loader">
                Loading...
              </div>
              ) : (
                <div className="lecture-contents">
                  <div className="lecture-controller">
                    controller
                    <div className="controller-item">학과
                      <select>
                        <option>컴퓨터공학부</option>
                        <option>전자공학부</option>
                        <option>기계공학부</option>
                      </select>
                    </div>
                    <div className="controller-item">
                      <a onClick={() => 
                        this.componentDidMount(this.setState({ gubun: "A.json", isLoading: true}))  
                        } href="#">학부(대학교)</a>
                      <a onClick={() => (
                        this.componentDidMount(this.setState({ gubun: "G.json", isLoading: true}))                 
                      )} href="#">석사(대학원)</a>
                    </div>
                    
                     
                  </div>
                  <table>
                    <thead>
                      <tr>
                          <th width="70">No</th>
                          <th>강의코드</th>
                          <th>강의명</th>
                          <th width="70">학기</th>
                          <th>강의시간</th>
                          <th width="120">교수이름</th>
                          <th width="120"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentLectures.map(lecture => (
                        <Lecture
                          key={lecture.lectureIdx}
                          lectureIdx={lecture.lectureIdx}
                          lectureGubun={lecture.lectureGubun} 
                          lectureName={lecture.lectureName} 
                          code={lecture.code} 
                          lectureYear={lecture.lectureYear} 
                          lectureSemester={lecture.lectureSemester}
                          lectureDate={lecture.lectureDate}
                          professorName={lecture.professorName}
                          lectureCode={lecture.lectureCode}
                        />
                      ))}
                    </tbody>
                  </table>
                  <Pagination 
                    postsPerPage={postsPerPage} 
                    totalPosts={lectures.length} 
                    paginate={paginate} />
                </div>
              )}
          </section>
        <footer className="lecture-page-footer">
          github. https://github.com/doorisopen
        </footer>
      </div>
    );
  }

}
export default App;
