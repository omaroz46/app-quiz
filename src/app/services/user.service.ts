import { Injectable } from '@angular/core';
import { LoadingController } from "@ionic/angular";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "src/environments/environment";
import { User } from "../data/user";
export const USER_TABLE = 'user'

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private supabase: SupabaseClient

  constructor (private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  createLoader() {
    return this.loadingCtrl.create()
  }

  async getUser (id: number) {
    const { data, error } = await this.supabase
      .from(USER_TABLE)
      .select('*')
      .eq('id', id)
      .single()

    return data || {}
  }

  async updateUser (user: User) {
    const {data, error} = await this.supabase
      .from(USER_TABLE)
      .update(user)
      .eq('id', user.id)
      .select()

    return data
  }

  async createUser (user: User) {
    const {data, error} = await this.supabase
      .from(USER_TABLE)
      .insert(user)
      .select('*')
      .single()

    return data
  }

  async deleteUser (user: User) {
    const {data, error} = await this.supabase
      .from(USER_TABLE)
      .delete()
      .eq('id', user.id)
      .select()

    return data
  }
}
