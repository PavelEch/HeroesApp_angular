import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { heroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, pipe, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-hero-page',
  templateUrl: './add-hero-page.component.html',
  styles: ``
})
export class AddHeroPageComponent implements OnInit{

  public heroForm = new FormGroup(
    {
      id:               new FormControl<string>(''),
      superhero:        new FormControl<string>('', {nonNullable:true}),
      publisher:        new FormControl<Publisher>(Publisher.DCComics),
      alter_ego:        new FormControl<string>(''),
      first_appearance: new FormControl<string>(''),
      characters:       new FormControl(''),
      alt_img:          new FormControl<string>(''),
    });

  public publishers = [
    {
      id: 'DC Comics', desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics', desc: 'Marvel - Comics'
    },
  ];

  constructor(
    private heroesService: heroesService,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ){}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if(!this.Router.url.includes('edit')) return;

    this.ActivatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroesService.getHeroById(id)),
    ).subscribe(hero =>{
      if(!hero) return this.Router.navigateByUrl('/');
      this.heroForm.reset(hero);
      return;
    });


  }

  onSubmit():void{

    if(this.heroForm.invalid)return;

    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe(hero =>{
        //TODO: mostrar snackbar
        this.showSnackBar(`${hero.superhero} updated.`);
      });

      return;
    }

    this.heroesService.addHero(this.currentHero)
    .subscribe(hero =>{
      //TODO: mostrar snackbar, y redirigir a /heroes/edit/id
      this.Router.navigate(['/heroes/edit',hero.id]);
      this.showSnackBar(`${hero.superhero} created succesfully.`);
    });
    // this.heroesService.updateHero(this.heroForm.value);
  }

  onDeleteHero(){
    if(!this.currentHero.id) throw Error('No Hero selected for deletion');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result:boolean) => result),
      switchMap( () =>this.heroesService.deleteHeroById(this.currentHero.id)),
      filter((wasDeleted:boolean) => wasDeleted),
    )
    .subscribe(() => {
      this.Router.navigate(['/heroes/list-hero']);
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if(!result) return;
    //   this.heroesService.deleteHeroById(this.currentHero.id).subscribe(
    //     wasDeleted => {
    //       if(wasDeleted)
    //     }
    //   );
    // });
  }

  showSnackBar(message:string):void{
    this.snackbar.open(message,'Done',{duration:2500,});

  }


}
