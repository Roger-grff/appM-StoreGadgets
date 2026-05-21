import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export interface Gadget {
  id?: number;
  nombre: string;
  marca: string;
  modelo?: string;
  precio: number;
  stock: number;
  categoria?: string;
  descripcion?: string;
  imagen_url?: string;
  video_url?: string;
  audio_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GadgetsService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // LISTAR TODOS LOS GADGETS
  async listar() {
    const { data, error } = await this.supabase
      .from('gadgets')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    return data as Gadget[];
  }

  // OBTENER GADGET POR ID
  async obtenerPorId(id: number) {
    const { data, error } = await this.supabase
      .from('gadgets')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Gadget;
  }

  // CREAR GADGET
  async crear(gadget: Gadget) {
    const { data, error } = await this.supabase
      .from('gadgets')
      .insert(gadget)
      .select();

    if (error) throw error;
    return data;
  }

  // ACTUALIZAR GADGET
  async actualizar(id: number, gadget: Gadget) {
    const { data, error } = await this.supabase
      .from('gadgets')
      .update(gadget)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  }

  // ELIMINAR GADGET
  async eliminar(id: number) {
    const { error } = await this.supabase
      .from('gadgets')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}