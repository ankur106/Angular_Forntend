import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid;
  questions;

  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;


  isSubmit = false;

  constructor(
    private locacationSt: LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService
  ) { }

  ngOnInit(): void {
    this.preventBackButoon();
    this.qid = this._route.snapshot.params.qid;
    this.loadQuestion();
  }

  loadQuestion() {
    this._question.getQuestionsOfQuizForTest(this.qid)
      .subscribe((data: any) => {
        

        this.questions = data;

        this.questions.forEach((q) => {
          q['givenAnswer'] = '';
        });

        // console.log(this.questions);

      },

        (error) => {
          console.log(error);
          Swal.fire("Error", "Error Occured", 'error');

        }
      );
  }

  preventBackButoon() {
    history.pushState(null, null, location.href);
    this.locacationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    })

  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Submit`,
      denyButtonText: `Don't submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        //plz submit quiz

        this.isSubmit = true;

        this.questions.forEach(q => {

          if (q.givenAnswer == q.answer) {
            this.correctAnswer++;
            let matksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot += matksSingle;
          }

          if (q.givenAnswer.trim() != '') {
            this.attempted++;
          }

        });
      }
    })
  }

}

